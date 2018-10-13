'use babel';

import Laravel2PhoneView from './laravel-2-phone-view';
import { CompositeDisposable } from 'atom';

export default {

  laravel2PhoneView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.laravel2PhoneView = new Laravel2PhoneView(state.laravel2PhoneViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.laravel2PhoneView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'laravel-2-phone:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.laravel2PhoneView.destroy();
  },

  serialize() {
    return {
      laravel2PhoneViewState: this.laravel2PhoneView.serialize()
    };
  },

  toggle() {
      let self = this;
      const QRCode = require("qrcode");

      //toggle panel
      if (this.modalPanel.isVisible()) {
        return this.modalPanel.hide();
      } else {
      //call function to get IP Address
        const ip = self.getIPAddress();

        //call function to load well server
        this.loadWebServer();

        //create and load QR Code
        QRCode.toCanvas(
          "http://" + ip + ":3000",
          { errorCorrectionLevel: "H" },
          function(err, canvas) {
            if (err) throw err;

            var container = document.getElementById("qr-box");
            container.innerHTML = "";
            container.innerHTML = "Scan QR Code.";
            container.appendChild(canvas);
          }
        );
        return this.modalPanel.show();
      }
    },

    loadWebServer() {
      let self = this;

      var http = require("http");
      var express = require("express");
      var util = require("util");
      var exec = require("child_process").exec;

      //get project path from Atom Project Explorer
      var projectPath = atom.project.getPaths();
      var projectName = projectPath.toString();

      const ip = self.getIPAddress();

      function puts(error, stdout, stderr) {
        console.log(stdout);
      }

      //run commands to start Laravel server
      const cmd = `cd ${projectName}
      kill-port --port 3000
      php artisan serve --host ${ip} --port=3000`;

      exec(cmd, puts);
    },

    getIPAddress() {
      var interfaces = require("os").networkInterfaces();
      for (var devName in interfaces) {
        var iface = interfaces[devName];

        for (var i in iface) {
          var alias = iface[i];
          if (
            alias.family === "IPv4" &&
            alias.address !== "127.0.0.1" &&
            !alias.internal
          )
            return alias.address;
        }
      }

      return "0.0.0.0";
    }

};
