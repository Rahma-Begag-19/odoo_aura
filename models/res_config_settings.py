from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = "res.config.settings"

    aura_navbar_color = fields.Char(
        string="Navbar Color",
        config_parameter="odoo_aura.navbar_color",
        default="#714b67",
    )
    aura_navbar_text_color = fields.Selection(
        selection=[("white", "White"), ("black", "Black")],
        string="Navbar Text Color",
        config_parameter="odoo_aura.navbar_text_color",
        default="white",
    )


class IrHttp(models.AbstractModel):
    _inherit = "ir.http"

    def session_info(self):
        info = super().session_info()
        params = self.env["ir.config_parameter"].sudo()
        info["aura_navbar_color"] = (
            params.get_param("odoo_aura.navbar_color") or "#714b67"
        )
        info["aura_navbar_text_color"] = (
            params.get_param("odoo_aura.navbar_text_color") or "white"
        )
        return info