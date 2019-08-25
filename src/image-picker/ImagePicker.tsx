import * as React from 'react'
import './style/index.scss'

/**
 * @author wdong
 * @version 0.0.1
 */
export default class ImagePicker extends React.PureComponent<ImagePickerProps, any> {
  static defaultProps = {
    prefixCls: 'x-image-picker'
  }

  constructor(props: ImagePickerProps) {
    super(props)
    this.state = {}

    this.state = {
      images: []
    };
  }

  componentDidMount(): void { }

  // static getDerivedStateFromProps(nextProps: ImagePickerProps, prevState: any) {
  //   return null
  // }

  files: any = [];

  upload: any = null;

  render() {
    const { prefixCls, maxLength = 4, ...resetProps } = this.props;

    return (
      <div className={prefixCls} {...resetProps}>
        {
          this.state.images.map((img: any, index: number) => {
            return (
              <div className={`${prefixCls}-item`} key={index}>
                <i className={`${prefixCls}-img-del`} onClick={() => this.del(index)}></i>
                <div className={`${prefixCls}-img`} style={{ backgroundImage: `url(${img})` }}></div>
              </div>
            )
          })
        }
        {
          this.state.images.length < maxLength && <div className={`${prefixCls}-item`}>
            <div className={`${prefixCls}-picker`}>
              <input ref={upload => this.upload = upload} type="file" accept="image/*" onChange={this.onChange} />
            </div>
          </div>
        }
      </div>
    )
  }

  //监听图片列表改变事件
  onChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (res: any) => {
      this.upload.value = "";
      this.state.images.push(res.target.result);
      this.files.push(file);
      this.setState({
        images: [...this.state.images]
      });
      this.props.change && this.props.change(this.files, true, null);
    }
  }

  //删除事件
  del = (index: number) => {
    this.state.images.splice(index, 1);
    this.files.splice(index, 1);
    this.setState({
      images: [...this.state.images]
    });

    this.props.change && this.props.change(this.files, false, index);
  }
}

export interface ImagePickerProps extends React.HTMLAttributes<{}> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string;
  /**
   * change回调函数
   * @param {Array} files 当前图片集合
   * @param {Boolean} type 操作类型：添加(true)，移除(false)
   * @param {Number} index 不必须，移出图片索引
   */
  change?: (files: any, type: boolean, index: any) => void
  /**
   * 上传图片最大数量，默认值为4
   */
  maxLength?: any
}