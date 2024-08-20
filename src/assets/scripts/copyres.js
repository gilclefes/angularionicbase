var fs = require("fs-extra");

module.exports = function () {
  fs.copy(
    "google-services.json",
    "android/app/google-services.json",
    function (err) {
      if (err) return console.error(err);
      console.log("google-services.json copied successfully!");
    }
  );
};
