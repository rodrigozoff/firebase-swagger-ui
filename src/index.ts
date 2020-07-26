'use strict';
import { FirebaseSwaggerUI, IAppOptions } from "./middleware/firebase-swagger-ui";

export function create(definitionPath: string, appOptions:IAppOptions): FirebaseSwaggerUI {
  return new FirebaseSwaggerUI(definitionPath, appOptions);
}
