{
    'name': 'Odoo Aura',
    'version': '19.0.1.0.0',
    'category': 'Administration',
    'summary': 'Personalize the Odoo backend interface',
    'description': """
        Odoo Aura lets users customize their Odoo workspace.

        Planned features:
        - Navbar positioning and appearance
        - Company logo and branding
        - Custom colors and typography
        - Backend view appearance customization
    """,
    'author': 'Rahma Begag',
    'website': 'https://github.com/Rahma-Begag-19/odoo_aura',
    'license': 'LGPL-3',
    'depends': [
        'base',
        'web',
    ],
    'depends': ['web', 'base_setup'],
    'data': [
        'views/res_config_settings_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'odoo_aura/static/src/js/navbar.js',
            'odoo_aura/static/src/xml/navbar.xml',
            'odoo_aura/static/src/scss/navbar.scss',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
}
