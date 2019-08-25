let gulp = require('gulp');
let less = require('gulp-less');
let ts = require('gulp-typescript');
let uglify = require('gulp-uglify');
let shell = require('shelljs');
let open = require('open');
let del = require('del');
let fs = require("fs");
let glob = require('glob');
let path = require('path');
const replace = require('gulp-replace');
const rename = require("gulp-rename");
let lessFunctions = require('less-plugin-functions'); //1.less function插件
let lessFn = new lessFunctions(); //2.创建一个实例


let runTsc = () => {
    console.log("ts编译");
    var tsconfig = require("./tsconfig");
    tsconfig.compilerOptions = tsconfig.compilerOptions || {};
    tsconfig.compilerOptions.declaration = true;

    fs.writeFileSync("_tsconfig_.json", JSON.stringify(tsconfig));

    // 生成src中的index.ts
    let fromComponentsListPath = path.join(__dirname, 'src');
    let dirList = dirListIn(fromComponentsListPath);
    let dirListCount = dirList.length;
    let componentsText = "";
    for (let i = 0; i < dirListCount; i++) {
        componentsText += `\nexport { default as ${CpNameTransfer(dirList[i])} } from "./${dirList[i]}";`
    }
    let srcIndexTs = path.join(fromComponentsListPath, 'index.ts');
    fs.writeFileSync(srcIndexTs, componentsText);

    //获取ts配置
    let tsProj = ts.createProject("_tsconfig_.json");

    gulp.src('./src/**/*.?(tsx|ts)')
        .pipe(tsProj())
        .pipe(gulp.dest("lib"));

    del('./_tsconfig_.json');
}

let runLessToCss = () => {
    console.log("less转css");
    gulp.src('./src/**/*.less')
        .pipe(less())
        .pipe(gulp.dest("lib"));
}

let runLessTOless = () => {
    console.log("复制less文件");
    gulp.src('./src/**/*.less')
        .pipe(gulp.dest("lib"));
}

let runImg = () => {
    console.log("复制图片");
    gulp.src('./src/**/*.?(png|jpg|gif)')
        .pipe(gulp.dest("lib"));
}

let runPackage = () => {
    console.log("复制package.json");
    gulp.src('./src/**/package.json')
        .pipe(gulp.dest("lib"));
}

let runDist = () => {
    console.log("开始所有");
    runTsc();
    runLessToCss();
    runImg();
    runLessTOless();
    runPackage();
}

gulp.task("lib", function (cb) {
    runDist();
    cb && cb();
});

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.?(tsx|ts|less)', './demo/src/tpl/**/*.?(jsx|less)'], function (event) {
        runDist();
        initDemo();
    });
})

gulp.task('default', ["lib"]);

/**
 * demo
 */

gulp.task('demo', ["watch", "creatDemo", "lib"], () => {
    shell.exec('cd demo && gulp open', {
        async: true,
        silent: false
    });
});

gulp.task("creatDemo", function (cb) {
    initDemo();
    cb && cb();
})

// 遍历指定目录中的目录
let dirListIn = function (pattern) {
    let pa = fs.readdirSync(pattern);
    let dirList = [];
    pa.forEach(function (ele, index) {
        var info = fs.statSync(pattern + "/" + ele);
        if (info.isDirectory() && ele != "Common" && ele != "_util" && ele != "_style") {
            dirList.push(ele)
        }
    })
    return dirList;
}

let initDemo = function () {
    // components目录
    let fromComponentsListPath = path.join(__dirname, 'src');
    let dirList = dirListIn(fromComponentsListPath);
    let dirListCount = dirList.length;
    let datas = [];

    for (let i = 0; i < dirListCount; i++) {
        let ele = dirList[i];
        let p = path.join(__dirname, `src/${ele}/index.tsx`);
        let fsString = fs.readFileSync(p, "utf8");

        let reg = /(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g;
        let mat = fsString.match(reg);

        if (mat) {
            let text = mat[0];
            let obj = toObject(unwrap(text));
            obj.name = ele;
            creatDemos("components", obj);
            datas.push(obj);

        }
    }
    // console.log(datas)
    creatSideNavs("index", datas);
    creatMobileEntry("mobile", datas)
    creatPage();
    creatPage("mobile");
}

//创建demo中的例子
let creatDemos = function (type, data) {
    let tplPath = path.join(__dirname, `demo/src/tpl/${type}`);
    let demoPath = path.join(__dirname, `demo/src/${type}/${data.name}`);

    // 清除例子两端空白符
    if (!data.example) {
        console.log(`找不到example，在${data.name}`);
        return;
    }

    data.example = data.example.replace(/(^\s*)|(\s*$)/g, "");

    // 目录是否存在s
    if (!fs.existsSync(demoPath)) {
        fs.mkdirSync(demoPath);
    }

    gulp.src(path.join(tplPath, "example.jsx"))
        .pipe(replace('__example__', data.example || ""))
        .pipe(gulp.dest(demoPath));

    // 拷贝新对象，删除例子
    let dataWithoutExp = Object.assign({}, data);
    delete dataWithoutExp.example;

    dataWithoutExp.name = CpNameTransfer(dataWithoutExp.name);

    gulp.src(path.join(tplPath, "index.jsx"))
        .pipe(replace('__data__', JSON.stringify(dataWithoutExp) || "{}"))
        .pipe(replace('__expCode__', `\`${data.example}\``))
        .pipe(gulp.dest(demoPath));
    gulp.src(path.join(tplPath, "mobile.jsx"))
        .pipe(gulp.dest(demoPath));
}

//创建demo顶部导航
let headerNavs = function (types) {
    let navsText = "";
    for (let i = 0; i < types.length; i++) {
        navsText += `<li><a className="${types[i] != "components" ? "disabled" : ""}" href="${types[i] == "components" ? `./${types[i]}.html` : ""}">${types[i]}</a></li>`
    }
    return navsText;
}

//创建demo左侧导航
let creatSideNavs = function (type = "index", datas) {
    let tplPath = path.join(__dirname, `demo/src/tpl/entrys/${type}/`);
    let entryPath = path.join(__dirname, `demo/src/entrys/${type}/`);

    // 目录是否存在
    if (!fs.existsSync(entryPath)) {
        fs.mkdirSync(entryPath);
    }

    let importsText = "";
    let routersText = "";
    let navsText = "";
    let datasCount = datas.length;
    for (let i = 0; i < datasCount; i++) {
        let item = datas[i];

        importsText += `// ${item.title}
        import ${CpNameTransfer(item.name)}Container from 'bundle-loader?lazy!components/${item.name}/index.jsx';
        const ${CpNameTransfer(item.name)}  = ReactRouterBundleLoader(${CpNameTransfer(item.name)}Container);\n`

        routersText += `<Route path="/${CpNameTransfer(item.name)}" render={({location})=>{
            return <${CpNameTransfer(item.name)} didMount={()=>{
                if(location.pathname=="/${CpNameTransfer(item.name)}" && _this.state.routerHash!=="${CpNameTransfer(item.name)}"){
                    _this.setState({
                        routerHash: "${CpNameTransfer(item.name)}",
                    })
                }
            }}/>
        }} />\n`;

        navsText += `<li className={classnames({"navActive":this.state.routerHash=="${CpNameTransfer(item.name)}"})}><a href="#/${CpNameTransfer(item.name)}">${CpNameTransfer(item.name)}<span>${item.title || ""}</span></a></li>\n`
    }

    gulp.src(path.join(tplPath, "App.jsx"))
        .pipe(replace('__importsText__', importsText))
        .pipe(replace('__routersText__', routersText))
        .pipe(replace('__navsText__', navsText))
        .pipe(replace('__header_nav__', headerNavs([])))
        .pipe(gulp.dest(entryPath));
    gulp.src(path.join(tplPath, "index.jsx"))
        .pipe(gulp.dest(entryPath));
}

//创建mobile入口
let creatMobileEntry = function (type = "mobile", datas) {
    let tplPath = path.join(__dirname, `demo/src/tpl/entrys/${type}/`);
    let entryPath = path.join(__dirname, `demo/src/entrys/${type}/`);

    // 目录是否存在
    if (!fs.existsSync(entryPath)) {
        fs.mkdirSync(entryPath);
    }

    let importsText = "";
    let routersText = "";
    let mobileHomeItems = "";
    let datasCount = datas.length;
    for (let i = 0; i < datasCount; i++) {
        let item = datas[i];

        importsText += `// ${item.title}
        import ${CpNameTransfer(item.name)}Container from 'bundle-loader?lazy!components/${item.name}/mobile.jsx';
        const ${CpNameTransfer(item.name)}Router  = ReactRouterBundleLoader(${CpNameTransfer(item.name)}Container);\n`

        routersText += `<Route path="/${CpNameTransfer(item.name)}" render={({location})=>{
            return <${CpNameTransfer(item.name)}Router didMount={()=>{
                if(location.pathname=="/${CpNameTransfer(item.name)}" && _this.state.routerHash!=="${CpNameTransfer(item.name)}"){
                    _this.setState({
                        routerHash: "${CpNameTransfer(item.name)}",
                        routerTitle: "${item.title}"
                    })
                }
            }}/>
        }} />\n`;

        mobileHomeItems += `<div className="mobile-Home-item">
            <Button onClick={()=>{
                location.href = "#/${CpNameTransfer(item.name)}";
            }}>${item.title}<span>${item.name}</span></Button>
        </div>\n`;
    }

    gulp.src(path.join(tplPath, "**"))
        .pipe(replace('__importsText__', importsText))
        .pipe(replace('__routersText__', routersText))
        .pipe(replace('__mobileHomeItems__', mobileHomeItems))
        .pipe(gulp.dest(entryPath));
}

//创建page
let creatPage = function (type = "index", name = "组件") {
    let tplPath = path.join(__dirname, `demo/src/tpl/pages/${type}.html`);
    let pagePath = path.join(__dirname, `demo/src/pages`);

    gulp.src(tplPath)
        .pipe(replace('__pageName__', name))
        .pipe(rename(`${type}.html`))
        .pipe(gulp.dest(pagePath));
}

// 选出注释的文本
function unwrap(docletSrc) {
    if (!docletSrc) { return ''; }

    // note: keep trailing whitespace for @examples
    // extra opening/closing stars are ignored
    // left margin is considered a star and a space
    // use the /m flag on regex to avoid having to guess what this platform's newline is
    docletSrc =
        // remove opening slash+stars
        docletSrc.replace(/^\/\*\*+/, '')
            // replace closing star slash with end-marker
            .replace(/^\s*(\*\/)/gm, '')
            // remove left margin like: spaces+star or spaces+end-marker
            .replace(/^\s*(\* ?|\\Z)/gm, '')
            // remove end-marker
            .replace(/\s*\\Z$/g, '');

    return docletSrc;
}

// 把注释文本转成对象
function toObject(docletSrc) {
    var parsedTag;
    var tagData = [];
    var tagText;
    var tagTitle;
    let obj = {};

    // split out the basic tags, keep surrounding whitespace
    // like: @tagTitle tagBody
    docletSrc
        // replace splitter ats with an arbitrary sequence
        .replace(/^(\s*)@(\S)/gm, '$1\\@$2')
        // then split on that arbitrary sequence
        .split('\\@')
        .forEach(function ($) {
            if ($) {
                parsedTag = $.match(/^(\S+)(?:\s+(\S[\s\S]*))?/);


                if (parsedTag) {
                    tagTitle = parsedTag[1];
                    tagText = parsedTag[2];
                    if (!parsedTag[2]) {
                        tagTitle = "title";
                        tagText = parsedTag[1];
                    }

                    if (tagTitle) {
                        if (obj[tagTitle]) {
                            if (typeof obj[tagTitle] == "string") {
                                let oldValue = obj[tagTitle];
                                obj[tagTitle] = [oldValue];
                                obj[tagTitle].push(tagText);
                            } else if (Array.isArray(obj[tagTitle])) {
                                obj[tagTitle].push(tagText);
                            }
                        } else {
                            obj[tagTitle] = tagText;
                        }
                    }
                }
            }
        });

    return obj;
}

// 组件名格式转换
function CpNameTransfer(name) {
    let nameArr = [];
    if (name.indexOf("-") >= 0) {
        nameArr = name.split("-");
        for (let i = 0; i < nameArr.length; i++) {
            nameArr[i] = nameArr[i].substring(0, 1).toUpperCase() + nameArr[i].substring(1);
        }
    } else {
        nameArr[0] = name.substring(0, 1).toUpperCase() + name.substring(1);
    }
    return nameArr.join("");
}