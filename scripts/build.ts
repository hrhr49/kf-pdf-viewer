const {SUPPORTED_EXTENSIONS_WITHOUT_COMMA} = require('../src-common/media');
const {build, Platform} = require('electron-builder');

build({
  targets: Platform.MAC.createTarget(),
  config: {
    extends: null,
    mac: {
      extendInfo: {
        CFBundleDocumentTypes: [
          {
            CFBundleTypeExtensions: SUPPORTED_EXTENSIONS_WITHOUT_COMMA,
            CFBundleTypeIconFile: "My Awesome Application.icns"
          }
        ]
      }
    },
    files: [
      "build/**/*"
    ],
    directories: {
      "buildResources": "assets"
    },
  }
});

