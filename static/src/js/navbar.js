/** @odoo-module **/

import { NavBar } from "@web/webclient/navbar/navbar";
import { patch } from "@web/core/utils/patch";
import { user } from "@web/core/user";
import { browser } from "@web/core/browser/browser";
import { useState } from "@odoo/owl";

const STORAGE_KEY = "aura.navbar.collapsed";
const BODY_CLASS = "o_aura_nav_collapsed";

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
        this.auraState = useState({ collapsed: readCollapsed() });
        this._applyAuraCollapsed();
    },

    get auraCompany() {
        return user.activeCompany;
    },

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
        // The class goes on <body> so the page content shift can react to it too
        document.body.classList.toggle(BODY_CLASS, this.auraState.collapsed);
    },
});