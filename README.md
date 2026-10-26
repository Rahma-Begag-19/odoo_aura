# Odoo Aura

A modern sidebar navigation for the **Odoo 19** web client. Aura replaces the top navbar with a rounded, collapsible sidebar that shows your company branding, an app grid with icons, and an inline accordion for sub menus. The look is configurable from the Settings page: color, text color, position and font.

![Aura sidebar](static/description/screenshots/screenshot%201.png)
![Aura sidebar](static/description/screenshots/screenshot%202.png)
![Aura sidebar](static/description/screenshots/screenshot%203.png)

## Features

- **Company branding**: the company logo (rounded) and name sit side by side at the top of the sidebar.
- **Apps grid**: open the apps menu right under its button and pick an app from a grid of icons. The app name shows as a tooltip on hover.
- **Inline sub menus**: the sub menus of the current app expand as an accordion, indented by depth.
- **Current app logo**: always visible, also when the sidebar is collapsed.
- **Collapsible**: a chevron toggle switches between the full sidebar and a narrow icon-only one. The choice is remembered in the browser.
- **Theme settings** in *Settings → General Settings → Aura Theme*:
  - navbar color
  - navbar text color (white or black)
  - navbar position (left or right)
  - font style for the whole application



## Configuration

Go to **Settings → General Settings** and scroll to the **Aura Theme** block.

| Setting | Options | Default |
|---|---|---|
| Navbar Color | any color (color picker) | `#714b67` |
| Navbar Text Color | White, Black | White |
| Navbar Position | Left, Right | Left |
| Font Style | Odoo Default, Monospace, Roboto, Work Sans, Tuffy, Sans Serif | Odoo Default |

Click **Save**. Settings are read when the page loads, so refresh the browser (F5) if the changes don't appear right away.

Pick a text color that contrasts with the navbar color: a light navbar color needs black text, a dark one needs white text.

## Notes and limitations

- **Desktop only**: on screens narrower than 768px, the standard Odoo navbar is kept.
- **Web fonts**: Roboto, Work Sans and Tuffy are loaded from Google Fonts when selected, so users need internet access. Without it, the browser falls back to the generic sans-serif font.
- **Arabic text**: the web fonts above cover Latin text, so Arabic text uses the system's Arabic font.
- **Scope of the font setting**: it applies to the backend web client, not to the login page, the website, PDF reports or emails.
- **Enterprise home menu**: this module replaces the navbar apps menu. It has not been designed around the Enterprise full-screen home menu.
