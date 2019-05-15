import { google } from 'googleapis';
import Config from '../../../../config/dev.conf';

class OAuth {
  private oAuthClient: any = null;

  constructor() {
    this.oAuthClient = new google.auth.OAuth2(
      Config.OAuthInfo.clientID,
      Config.OAuthInfo.clientSecret,
      Config.OAuthInfo.callback,
    );
  }

  public getAuthURL(): any {
    return this.oAuthClient.generateAuthUrl({
      scope: Config.OAuthInfo.scopes,
    });
  }
}

export default OAuth;
