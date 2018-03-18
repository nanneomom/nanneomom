#keytool -genkey -v -keystore nanneo-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
rm -rf nanneo.apk
ionic cordova build --release android &&\
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore nanneo-key.keystore /home/hokira/nanneomom/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name &&\
zipalign -v 4 /home/hokira/nanneomom/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk nanneo.apk &&\
apksigner verify nanneo.apk
