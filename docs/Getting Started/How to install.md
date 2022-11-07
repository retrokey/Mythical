# How to install

## Needed Elements
✨ MySQL

	🔥 Arcturus Morningstar Database

✨ Arcturus Morningstar

	🔥 Compiled Emulator
	🔥 Nitro WebSockets plugin

✨ Nitro

	🔥 Compiled Build
	🔥 Compiled Assets

✨ Vanadis

	🔥 Repository (<a href="https://github.com/cosimoceleste/Vanadis">URL</a>)

## Vanadis | NODE MODULES
When you extracted the files zip file that downloaded from repository, open the CMD in the folder where you extracted the files and run "npm install".

## Vanadis | CONFIGURATION
For configure Vanadis, you be edit the configuration file that you find from "/src/resources/configuration.json".

## Vanadis | RUN COMPILATION
When you configured Vanadis, you can run on CMD, in the folder of it, "npm run build".
This is the command that make the compiled build. After the build is complete, you run "npm run start".

## Mythical | BASE PROCEDURE
The procedure for modules of nodejs, configuring and building is the same of Vanadis, but when the build is complete, you should be move the compiled files on folder of webserver that you selected (for example, htdocs for xampp).

## Mythical| USE OF CONFIGURATION VALUES
In the configuration file of Mythical, you find the values of hotel name, ranks that be show on staff list and that are basic.
After this, you find the "api_url", "nitro_url", and "thumbnail_url".

🔥 API url: The url where you does installed Vanadis (EXAMPLE: http://localhost:3002/

🔥 Nitro url: The url of compiled nitro (EXAMPLE: http://localhost/nitro/index.html?sso=)

🔥 Thumbnial url: The url thumbnail that users will make with camera (EXAMPLE: http://localhost/flash/swf/c_images/camera/thumbnail)

## Everything is done
If you done all steps that you did find on this page, Mythical be working.