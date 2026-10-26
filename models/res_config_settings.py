from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = "res.config.settings"

    aura_navbar_color = fields.Char(
        string="Navbar Color",
        config_parameter="your_module_name.navbar_color",
        default="#714b67",
    )


class IrHttp(models.AbstractModel):
    _inherit = "ir.http"

    def session_info(self):
        info = super().session_info()
        info["aura_navbar_color"] = (
            self.env["ir.config_parameter"].sudo().get_param("your_module_name.navbar_color")
            or "#714b67"
        )
        return info