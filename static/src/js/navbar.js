/** @odoo-module **/

import { NavBar } from "@web/webclient/navbar/navbar";
import { patch } from "@web/core/utils/patch";
import { user } from "@web/core/user";
import { browser } from "@web/core/browser/browser";
import { useService } from "@web/core/utils/hooks";
import { useState } from "@odoo/owl";

const STORAGE_KEY = "aura.navbar.collapsed";
const BODY_CLASS = "o_aura_nav_collapsed";
const DEFAULT_APP_ICON = "/web/static/img/default_icon_app.png";

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
        });
        this._applyAuraCollapsed();
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