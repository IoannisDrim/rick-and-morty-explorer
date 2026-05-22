/// <reference types="vite/client" />

declare module "*.gql" {
  import { DocumentNode } from "@apollo/client";
  const document: DocumentNode;
  export default document;
}
