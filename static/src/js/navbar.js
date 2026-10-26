/** @odoo-module **/

import { NavBar } from "@web/webclient/navbar/navbar";
import { patch } from "@web/core/utils/patch";
import { user } from "@web/core/user";

patch(NavBar.prototype, {
    get auraCompany() {
        return user.activeCompany;
    },
});