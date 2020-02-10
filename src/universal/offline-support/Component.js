const { useEffect } = require("react");
const { useForceUpdate } = require("../util");

const getStatusCodeIcon = statusCode => {
  switch (statusCode) {
    case "INITIALIZING":
      return "🟡";
    case "WARNING":
      return "🟠";
    case "ERROR":
      return "🔴";
    case "READY":
      return "🟢";
    default:
      throw new Error("Unknown status code");
  }
};

module.exports = ({ serviceWorker }) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    serviceWorker.events.on("change", forceUpdate);
  }, []);

  return [
    "Offline support: ",
    getStatusCodeIcon(serviceWorker.statusCode),
    serviceWorker.statusMessage && `(${serviceWorker.statusMessage})`
  ];
};
