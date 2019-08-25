import * as React from "react";
import cls from "classnames";
import "./style/index.scss";
import lrz from "lrz";
import { Icon } from "wd-mobile";

// 图片对象属性
export interface ImageItemProps {
  /**
   * 显示路径
   */
  showUrl: string;
  /**
   * 真实路径
   */
  realUrl?: string;
  /**
   * 类型
   */
  type: string;
}

// 图片上传组件属性
export class ImageUploadProps {
  /**
   * 样式前缀
   * @ignore
   * @default 'x-image-upload'
   */
  prefixCls?: string = "x-image-upload";
  /**
   * 自定义样式
   */
  className?: string = "";
  /**
   * 最大图片数，0为不限制
   */
  max?: number = 0;
  /**
   * 图片数组
   */
  imgs?: string[] = [];
  /**
   * 一行的图片数, 最大6，最小1
   */
  rowNum?: number = 3;
  /**
   * 上传接口, 必须有
   */
  uploadUrl: string;
  /**
   * 图片变动钩子
   */
  onImgChange?: (imgListUrl: string[]) => void; // 内容改变完成钩子
}

/**
 * @author wang
 * @version 0.0.1
 * @description 图片上传组件，ios中支持多图上传，支持最大图片数量
 */
export default class ImageUpload extends React.PureComponent<ImageUploadProps & React.HTMLAttributes<{}>, any> {
  static defaultProps = new ImageUploadProps();

  constructor(props: ImageUploadProps) {
    super(props);
    this.state = {
      imgElemenList: []// 图片元素列表
    };
  }

  /**
   * 图片列表
   */
  imgItemList: ImageItemProps[] = [];
  /**
   * 图片压缩尺寸
   */
  compressSize: number = 200;
  /**
   * 图片数量
   */
  imgAmount: number = this.props.imgs.length;
  /**
   * 最大上传限制
   */
  maxFileSize: number = 10 * 1048576;
  /**
   * 最大压缩限制，大于这个的都要压缩
   */
  maxCompressSize: number = 0.5 * 1048576;
  /**
   * inputRef
   */
  inputRef: any = React.createRef();

  componentDidMount(): void {
    this.initImgListData(this.props.imgs);
  }

  render() {
    const { prefixCls, className } = this.props;

    return (
      <div className={cls(prefixCls, className)}>
        {
          this.state.imgElemenList.map((item: any, index: number) => {
            return (
              <div key={index} className={`${prefixCls}-item ${prefixCls}-${item.type} ${prefixCls}-flex-rownum-${this.props.rowNum}`}
                style={{ backgroundImage: `url(${item.showUrl})` }}
              >
                {
                  item.type == "img" && <Icon className="x-icon-close-circle" onClick={() => {
                    const imgItems = [...this.imgItemList];// 获取已存在图片数组
                    imgItems.splice(index, 1);// 删除指定索引图片
                    this.imgAmount--;// 图片数量-1
                    this.setImgList(imgItems);
                    const imgListUrl = imgItems.map(item => {
                      return item.realUrl || item.showUrl;
                    });
                    // 删除图片回调
                    this.props.onImgChange && this.props.onImgChange(imgListUrl);
                  }} />
                }
                {
                  item.type == "add" && <input ref={this.inputRef} type="file" accept="image/*" multiple className={`${prefixCls}-input`} onChange={this.fileChose} />
                }
              </div>
            );
          })
        }
      </div>
    );
  }

  // 初始化图片列表数据
  initImgListData(imgs: string[]) {
    let imgItemList: ImageItemProps[] = [];
    if (!!imgs && Array.isArray(imgs)) {
      imgItemList = imgs.map(imgUrl => {
        return { showUrl: imgUrl, type: "img" };
      });
    }
    this.setImgList(imgItemList);
  }

  /**
   * 选择文件
   */
  fileChose = (e: any) => {
    const filesLength = e.target.files.length;
    // 计算本次上传图片数量
    const limitMax = this.props.max <= 0 || this.props.max >= filesLength ? filesLength : this.props.max;

    // 遍历图片
    for (let i = 0; i < limitMax; i++) {
      const file = e.target.files[i];

      // 检查图片是否超过最大限制
      if (file.size > this.maxFileSize) {
        alert(`${file.name}，文件过大，请上传小于${this.maxFileSize}M的图片`);
        return false;
      }

      // 修复图片显示兼容
      this.fixCompatible(file);
    }
  }

  /**
   * 修复图片显示兼容
   */
  fixCompatible = (file: any) => {
    lrz(file)
      .then((rst: any) => {
        this.inputRef.current.value = null;

        // 检查图片是否大于最小压缩限制
        if (file.size > this.maxCompressSize) {
          this.compressImg(rst.base64);
        } else {
          this.uploadImages(rst.base64);
        }
      })
      .catch(function (err: any) {
        this.props.onError && this.props.onError(err);
      });
  }

  /**
   * canvas压缩图片
   * @param {string} base64 图片
   */
  compressImg(url: string) {
    const img = new Image();
    img.src = url;
    var base64Str = "";
    img.onload = () => {
      // canvas压缩处理
      const xm: number = ~~(img.width / this.compressSize);
      const imgW = img.width / xm;
      const imgH = img.height / xm;
      const clipCanvas = document.createElement("canvas");
      clipCanvas.width = imgW;
      clipCanvas.height = imgH;
      const clipCtx: any = clipCanvas.getContext("2d");
      clipCtx.drawImage(img, 0, 0, imgW, imgH);
      base64Str = clipCanvas.toDataURL("image/png");

      // 转成流上传
      this.uploadImages(base64Str);
    };
  }

  /**
   * 上传图片
   * @param {string} base64 图片
   */
  uploadImages(base64: string) {
    const inputName = "file";
    const apiUrl = this.props.uploadUrl; // 接口地址

    // 设置图片数据列表
    const imgItems = [...this.imgItemList];// 获取已存在图片数组
    imgItems.push({ showUrl: base64, type: "img" }); // 增加图片
    this.imgAmount++;// 图片数量+1
    this.setImgList(imgItems);

    // 当前图片索引
    const thisItemIndex = imgItems.length - 1;

    // 请求
    const ajax = (url: string, data: any, success: Function = () => { }) => { // ajax
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          xhr.onreadystatechange = null;
          if (xhr.status === 200) {
            success(xhr.responseText);
          }
        }
      };
      xhr.open("POST", url, true);
      xhr.send(data);
    };

    // 转formdata
    const setFormData = (blob: Blob) => {
      const formData = new FormData();
      formData.append(inputName, blob, `${(new Date().getTime())}.${blob.type.split('/')[1]}`);
      return formData;
    };

    // base64转blob
    const dataURLtoBlob = (base64: string) => {
      const arr: string[] = base64.split(",");
      const mimeMatch = arr[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : "";
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], mime ? {
        type: mime
      } : undefined);
    };

    // 发送请求
    ajax(apiUrl, setFormData(dataURLtoBlob(base64)), (response: any) => {
      const imgItems = [...this.imgItemList];// 获取已存在图片数组
      imgItems[thisItemIndex].realUrl = JSON.parse(response).data[0];// 设置上传后的地址
      this.setImgList(imgItems);
      const imgListUrl = imgItems.map(item => {
        return item.realUrl || item.showUrl;
      });
      // 完成上传回调
      this.props.onImgChange && this.props.onImgChange(imgListUrl);
    });
  }

  /**
   * 设置图片数据
   * @param {Array} imgItemList 图片列表
   */
  setImgList(imgItemList: ImageItemProps[]) {
    // 需要设置到state内的图片类元素数量
    const imgState = [];
    // 是否需要添加按钮
    const needAdd = this.props.max == 0 || this.props.max > imgItemList.length;
    // 最后一行元素数量
    const remainder = (imgItemList.length + (needAdd ? 1 : 0)) % this.props.rowNum;
    // 空元素数量，空元素是为了在flex下更好的实现排版的占位元素，实现即可换行又可均分
    const emptyNum = remainder == 0 ? 0 : this.props.rowNum - remainder;
    // 元素总量
    const totalNum = imgItemList.length + emptyNum + (needAdd ? 1 : 0);
    // 循环生成所有元素数组
    for (let i = 0; i < totalNum; i++) {
      if (!!imgItemList[i]) {
        imgState.push(imgItemList[i]);
      } else if (!imgItemList[i] && i == imgItemList.length && needAdd) {
        // 如果没达到最大限制，可以继续添加
        imgState.push({ showUrl: "", type: "add" } as ImageItemProps);
      } else {
        imgState.push({ showUrl: "", type: "empty" });
      }
    }
    this.imgItemList = imgItemList;
    this.setState({
      imgElemenList: imgState
    });
  }
}