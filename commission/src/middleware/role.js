import AccessControl from "accesscontrol";

const ac = new AccessControl();

export default roles = () => {
  ac.grant("user").readOwn("transaction").updateOwn("transaction");

  ac.grant("manager").extend("user").readAny("transaction");

  ac.grant("admin")
    .extend("basic")
    .extend("manager")
    .updateAny("transaction")
    .deleteAny("transaction");

  return ac;
};
