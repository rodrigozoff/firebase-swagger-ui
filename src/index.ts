'use strict';
import { FirebaseSwaggerUI, IAppOptions } from "./middleware/firebase-swagger-ui";

export function create(appOptions: IAppOptions): FirebaseSwaggerUI {
  return new FirebaseSwaggerUI(appOptions);
}
