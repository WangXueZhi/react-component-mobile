const userAgent = window.navigator.userAgent.toLowerCase();

const find = (needle) => {
    return userAgent.indexOf(needle) !== -1;
};

export default class Device {

    static ios() {
        return Device.iphone() || Device.ipod() || Device.ipad();
    };

    static iphone() {
        return !Device.windows() && find("iphone");
    };

    static ipod() {
        return find("ipod");
    };

    static ipad() {
        return find("ipad");
    };

    static android() {
        return !Device.windows() && find("android");
    };

    static androidPhone() {
        return Device.android() && find("mobile");
    };

    static androidTablet() {
        return Device.android() && !find("mobile");
    };

    static blackberry() {
        return find("blackberry") || find("bb10") || find("rim");
    };

    static blackberryPhone() {
        return Device.blackberry() && !find("tablet");
    };

    static blackberryTablet() {
        return Device.blackberry() && find("tablet");
    };

    static windows() {
        return find("windows");
    };

    static windowsPhone() {
        return Device.windows() && find("phone");
    };

    static windowsTablet() {
        return Device.windows() && (find("touch") && !Device.windowsPhone());
    };

    static fxos() {
        return (find("(mobile;") || find("(tablet;")) && find("; rv:");
    };

    static fxosPhone() {
        return Device.fxos() && find("mobile");
    };

    static fxosTablet() {
        return Device.fxos() && find("tablet");
    };

    static meego() {
        return find("meego");
    };

    static cordova() {
        return window["cordova"] && location.protocol === "file:";
    };

    static nodeWebkit() {
        return typeof window["process"] === "object";
    };

    static mobile() {
        return Device.androidPhone() || Device.iphone() || Device.ipod() || Device.windowsPhone() || Device.blackberryPhone() || Device.fxosPhone() || Device.meego();
    };

    static tablet() {
        return Device.ipad() || Device.androidTablet() || Device.blackberryTablet() || Device.windowsTablet() || Device.fxosTablet();
    };

    static desktop() {
        return !Device.tablet() && !Device.mobile();
    };

    static television() {
        const television = [
            "googletv",
            "viera",
            "smarttv",
            "internet.tv",
            "netcast",
            "nettv",
            "appletv",
            "boxee",
            "kylo",
            "roku",
            "dlnadoc",
            "roku",
            "pov_tv",
            "hbbtv",
            "ce-html"
        ];
        let i = 0;
        while (i < television.length) {
            if (find(television[i])) {
                return true;
            }
            i++;
        }
        return false;
    };

    static portrait() {
        return (window.innerHeight / window.innerWidth) > 1;
    };

    static landscape() {
        return (window.innerHeight / window.innerWidth) < 1;
    };
}
