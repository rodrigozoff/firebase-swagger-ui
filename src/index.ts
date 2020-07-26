'use strict';
import { FirebaseSwaggerUI, IAppOptions } from "./middleware/express.app.config";

export function createFirebaseSwaggerUI(definitionPath: string, appOptions:IAppOptions): FirebaseSwaggerUI {
  return new FirebaseSwaggerUI(definitionPath, appOptions);
}
