import LayoutModule from './../layout/store/layout';
import AuthenticationModule from './../authentication/store/authentication';
import MainMenuModule from "./../layout/components/mainMenu/store/mainMenu";
import SettingsModule from './../settings/store/settings';

export default {
  layout: LayoutModule,
  authentication: AuthenticationModule,
  mainMenu: MainMenuModule,
  settings: SettingsModule
}
