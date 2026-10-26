from odoo import api, fields, models


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
    aura_font = fields.Selection(
        selection=[
            ("default", "Odoo Default"),
            ("mono", "Monospace"),
            ("roboto", "Roboto"),
            ("work_sans", "Work Sans"),
            ("tuffy", "Tuffy"),
            ("sans_serif", "Sans Serif"),
        ],
        string="Font Style",
        config_parameter="odoo_aura.font",
        default="default",
    )

    @api.model
    def default_get(self, fields_list):
        res = super().default_get(fields_list)
        # If a saved value is no longer one of the options, fall back to the default
        for name, fallback in (
            ("aura_font", "default"),
            ("aura_navbar_text_color", "white"),
        ):
            if name in res:
                valid = [key for key, _label in self._fields[name].selection]
                if res[name] not in valid:
                    res[name] = fallback
        return res


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
        info["aura_font"] = params.get_param("odoo_aura.font") or "default"
        return info