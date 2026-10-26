/** @odoo-module **/

import { NavBar } from "@web/webclient/navbar/navbar";
import { patch } from "@web/core/utils/patch";
import { user } from "@web/core/user";
import { session } from "@web/session";
import { browser } from "@web/core/browser/browser";
import { useService } from "@web/core/utils/hooks";
import { useState } from "@odoo/owl";

const STORAGE_KEY = "aura.navbar.collapsed";
const BODY_CLASS = "o_aura_nav_collapsed";
const DEFAULT_APP_ICON = "/web/static/img/default_icon_app.png";
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

function readCollapsed() {
    try {
        return browser.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
        return false;
    }
}

patch(NavBar.prototype, {
    setup() {
        super.setup();
        this.auraMenuService = useService("menu");
        this.auraState = useState({
            collapsed: readCollapsed(),
            appsOpen: false,
            openMenus: {},   // { [menuId]: true } for expanded sub menus
        });
        this._applyAuraCollapsed();
        this._applyAuraColors();
    },

    /* ----- Colors from Settings ----- */
    _applyAuraColors() {
        const root = document.documentElement.style;
        const color = session.aura_navbar_color;
        if (color && HEX_COLOR.test(color)) {
            root.setProperty("--o-aura-nav-color", color);
        }
        const text = session.aura_navbar_text_color === "black" ? "#000" : "#fff";
        root.setProperty("--o-aura-text", text);
    },

    /* ----- Company ----- */
    get auraCompany() {
        return user.activeCompany;
    },

    /* ----- Apps grid ----- */
    get auraApps() {
        return this.auraMenuService.getApps();
    },

    get auraCurrentApp() {
        return this.auraMenuService.getCurrentApp();
    },

    auraAppIcon(app) {
        return app.webIconData || DEFAULT_APP_ICON;
    },

    toggleAuraApps() {
        this.auraState.appsOpen = !this.auraState.appsOpen;
    },

    async openAuraApp(app) {
        this.auraState.appsOpen = false;
        await this.auraMenuService.selectMenu(app);
    },

    /* ----- Sub menus of the current app (flat list of rows for the template) ----- */
    get auraMenuRows() {
        const app = this.auraCurrentApp;
        if (!app) {
            return [];
        }
        const tree = this.auraMenuService.getMenuAsTree(app.id);
        const rows = [];
        const walk = (nodes, depth) => {
            for (const menu of nodes) {
                const children = menu.childrenTree || [];
                const hasChildren = children.length > 0;
                const open = hasChildren && !!this.auraState.openMenus[menu.id];
                rows.push({ menu, depth, hasChildren, open });
                if (open) {
                    walk(children, depth + 1);
                }
            }
        };
        walk(tree.childrenTree || [], 0);
        return rows;
    },

    onAuraMenuClick(row) {
        if (row.hasChildren) {
            this.auraState.openMenus[row.menu.id] = !this.auraState.openMenus[row.menu.id];
            return;
        }
        this.auraMenuService.selectMenu(row.menu);
    },

    /* ----- Collapse ----- */
    toggleAuraCollapse() {
        this.auraState.collapsed = !this.auraState.collapsed;
        try {
            browser.localStorage.setItem(STORAGE_KEY, this.auraState.collapsed ? "1" : "0");
        } catch {
            /* storage unavailable, ignore */
        }
        this._applyAuraCollapsed();
    },

    _applyAuraCollapsed() {
        document.body.classList.toggle(BODY_CLASS, this.auraState.collapsed);
    },
});