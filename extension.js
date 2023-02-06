/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const GETTEXT_DOMAIN = 'weekendometer-extension';

const { GObject, St } = imports.gi;

const Gettext = imports.gettext.domain(GETTEXT_DOMAIN);
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, _('Weekendometer'));

        let box = new St.BoxLayout({ style_class: 'panel-status-menu-box' });
        box.add_child(new St.Icon({style_class: this._getClassName()}));
        this.add_child(box);
    }

    _getClassName() {
        let now = new Date();
		let d = now.getDay();
		let h = now.getHours();
        let icon = '';

        switch (d) {
            case 1:
                icon = h < 12 ? '0' : '0';
                break;
            case 2:
                icon = h < 12 ? '1' : '2';
                break;
            case 3:
                icon = h < 12 ? '3' : '4';
                break;
            case 4:
                icon = h < 12 ? '5' : '6';
                break;
            case 5:
                icon = h < 12 ? '7' : '8';
                break;
            case 6:
                icon = h < 12 ? '4' : '3';
                break;
            case 0:
                icon = h < 12 ? '2' : '1';
                break;
            default:
                break;
        }
        
        let classname = 'base wom-'+icon;
		return classname;    
    }
});

class Extension {
    constructor(uuid) {
        this._uuid = uuid;

        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }

    enable() {
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this._uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init(meta) {
    return new Extension(meta.uuid);
}
