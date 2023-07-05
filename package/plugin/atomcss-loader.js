/**
 * 原子类定义如下：
 *
 * margin：m、ml、mr、mt、mb、mx、my
 * padding：p、pl、pr、pt、pb、px、py
 * width：w、w-p
 * height：h、h-p
 * 四方向：l、r、t、b
 * 行高：lh
 * 字体：fs、fw
 * border-radius：br
 *
 */
let oClassNameMap = {
  // margin
  '.m': 'margin:$px',
  '.ml': 'margin-left:$px',
  '.mr': 'margin-right:$px',
  '.mt': 'margin-top:$px',
  '.mb': 'margin-bottom:$px',
  '.mx': 'margin-left:$px;margin-right:$px',
  '.my': 'margin-top:$px;margin-bottom:$px',
  // margin !important
  '.mi': 'margin:$px !important',
  '.mli': 'margin-left:$px !important',
  '.mri': 'margin-right:$px !important',
  '.mti': 'margin-top:$px !important',
  '.mbi': 'margin-bottom:$px !important',
  '.mxi': 'margin-left:$px !important;margin-right:$px !important',
  '.myi': 'margin-top:$px !important;margin-bottom:$px !important',
  // padding
  '.p': 'padding:$px',
  '.pl': 'padding-left:$px',
  '.pr': 'padding-right:$px',
  '.pt': 'padding-top:$px',
  '.pb': 'padding-bottom:$px',
  '.px': 'padding-left:$px;padding-right:$px',
  '.py': 'padding-top:$px;padding-bottom:$px',
  // padding !important
  '.pi': 'padding:$px !important',
  '.pli': 'padding-left:$px !important',
  '.pri': 'padding-right:$px !important',
  '.pti': 'padding-top:$px !important',
  '.pbi': 'padding-bottom:$px !important',
  '.pxi': 'padding-left:$px !important;padding-right:$px !important',
  '.pyi': 'padding-top:$px !important;padding-bottom:$px !important',
  // width
  '.w': 'width:$px',
  '.wi': 'width:$px !important',
  '.mw': 'min-width:$px',
  '.wp': 'width:$%',
  '.wpi': 'width:$% !important',
  // height
  '.h': 'height:$px',
  '.hi': 'height:$px !important',
  '.mh': 'min-height:$px',
  '.hp': 'height:$%',
  '.hpi': 'height:$% !important',
  // 四方向
  '.l': 'left:$px',
  '.r': 'right:$px',
  '.t': 'top:$px',
  '.b': 'bottom:$px',
  // 行高
  '.lh': 'line-height:$px',
  // 字体
  '.fs': 'font-size:$px',
  '.fw': 'font-weight:$',
  // background
  '.bgs': 'background-size:$px',
  // border
  '.br': 'border-radius:$px',
  // 颜色
  '.c': 'color: #',
  '.bgc': 'background-color: #',
  // z-index
  '.z': 'z-index: $',
};

let oAtomConfig = null;
let sAtomRegExp = '';

// 获取原子类正则表达式
function getAtomClassReg(oConfig) {
  // 缓存配置，避免每次执行都生成一次
  if (!oAtomConfig) {
    oAtomConfig = oConfig;

    // 如果模式为 rem，则将 px 替换为 rem
    if (oAtomConfig.mode === 'rem') {
      for (let key in oClassNameMap) {
        oClassNameMap[key] = oClassNameMap[key].replace(/\$px/gi, '$rem');
      }
    }

    oClassNameMap = Object.assign(oClassNameMap, oAtomConfig.config || {});

    // 生成正则表达式
    let aAtomRegExp = [];
    for (let key in oClassNameMap) {
      let value = oClassNameMap[key];

      // 数值原子类的正则
      if (value.indexOf('$') != -1) {
        aAtomRegExp.push(`\\${key}-[0-9]+`);
      }
      // 色值原子类正则
      else if (value.indexOf('#') != -1) {
        aAtomRegExp.push(`\\${key}-[0-9a-fA-F]+`);
        // 通用原子类的正则
      } else {
        aAtomRegExp.push(`\\${key}`);
      }
    }

    // 规则长的排在前面，保证全匹配
    aAtomRegExp.sort((a, b) => b.length - a.length);

    sAtomRegExp = aAtomRegExp.join('|');
    return sAtomRegExp;
  } else {
    return sAtomRegExp;
  }
}

// 从文件中提取所有类名
function getAllClassNameFromSource(sSource) {
  // 从 vue 文件中提取 pug 代码
  let sPugString = '',
    sHtmlString = '',
    sClassString = '';
  try {
    // 匹配 pug
    sPugString = sSource.match(
      /<template lang=("|')pug("|')>([\s\S]*)<\/template>/g
    );
    // 匹配 html
    sHtmlString = sSource.match(/<template>([\s\S]*)<\/template>/g);

    // html 文本需要特殊处理
    if (sPugString) {
      sClassString = sPugString[0];
    } else if (sHtmlString) {
      sClassString =
        '.' +
        (sHtmlString[0].match(/class=("|')([a-zA-Z0-9 \- _]*)("|')/gi) || [])
          .map((item) =>
            item
              .replace(/class=('|")|("|')/g, '')
              .split(' ')
              .join('.')
          )
          .join('.');
    }
  } catch (e) {
    console.warn(e);
    return '';
  }

  return sClassString;

  // // 支持 pug 文件内 include 的文件的编译
  // let pugFileList = sClassString.match(/include \S*\.pug/g) || [];
  // pugFileList.forEach((file) => {
  //   let filePath =
  //     this.resourcePath.substr(0, this.resourcePath.lastIndexOf('/') + 1) +
  //     file.replace('include ', '');

  //   // pug 文件改变，重新编译主文件
  //   this.addDependency(filePath);

  //   let content = fs.readFileSync(filePath, 'utf-8');
  //   sClassString = sClassString.replace(file, content);
  // });
}

// 生成原子类
function generateAtomCss(sAtomRegExp, sClassString) {
  // 获取匹配的类名数组，并剔除重复的类名
  let atomReg = new RegExp(sAtomRegExp, 'ig');
  function uniq(value, index, self) {
    return self.indexOf(value) === index;
  }
  let aClassName = (sClassString.match(atomReg) || []).filter(uniq);

  // 原子类样式接收数组
  let aStyleStr = [];

  // 开始生成原子类
  aClassName.forEach((item) => {
    let bColorFlag =
      oClassNameMap[item.split('-')[0]] &&
      oClassNameMap[item.split('-')[0]].indexOf('$') == -1 &&
      oClassNameMap[item.split('-')[0]].indexOf('#') != -1 &&
      /^[0-9a-fA-F]+$/.test(item.split('-')[1]); // 十六进制

    // 色值类
    if (bColorFlag) {
      let tmp = item.split('-');
      if (tmp.length > 1) {
        let sKey = tmp.slice(0, tmp.length - 1).join('-');
        let nValue = '#' + tmp[tmp.length - 1];
        aStyleStr.push(
          `${item}{${oClassNameMap[sKey].replace(/\#/g, nValue)}}`
        );
      }
    }
    // 数值类
    else if (/\d+/.test(item)) {
      let tmp = item.split('-');
      if (tmp.length > 1) {
        let sKey = tmp.slice(0, tmp.length - 1).join('-');
        let nValue = tmp[tmp.length - 1];
        aStyleStr.push(
          `${item}{${oClassNameMap[sKey].replace(/\$/g, nValue)}}`
        );
      }
      // 通用类
    } else {
      let sKey = item;
      aStyleStr.push(`${item}{${oClassNameMap[sKey]}}`);
    }
  });

  return aStyleStr;
}

export default function (sSource, oConfig = {}) {
  // 获取原子类正则表达式
  let sAtomRegExp = getAtomClassReg(oConfig);
  // 从文件中提取所有类名
  let sClassString = getAllClassNameFromSource(sSource);

  if (!sClassString) return { code: sSource, css: [] };

  // 正式生成原子类
  let aStyleStr = generateAtomCss(sAtomRegExp, sClassString);

  return {
    code: `${sSource}\n<style>${aStyleStr.join('')}</style>\n`,
    css: aStyleStr,
  };
}
