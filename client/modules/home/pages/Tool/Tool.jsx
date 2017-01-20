
import React, { Component } from 'react';
import * as _ from 'lodash';
import { fetchAPI } from 'utils/fetch';
import { API } from 'config';

import {
  Button,
  Switch,
  Input,
  Form,
  Radio,
  Select,
} from 'dragon-ui';

class Page extends Component {
  constructor(props) {
    super(props);
    this.servers = _.keys(API);
    this.state = {
      // view config
      inner: true,
      // fetch config
      url: '',
      server: this.servers[0],
      path: '/v1/api/account/login/cache',
      isInclude: true,
      method: 'POST',
      isFormData: false,
      inputData: JSON.stringify({
        userId: 50002385002,
        targetId: 50001750001,
        accountType: '1',
        accountStatus: '1',
        id: 50002400002,
        accessKey: '4a67787192a433b9e9077944cf993e0e3',
      }, undefined, 4),
      formData: [
        { field: '', value: '', file: null, type: 'text' },
        { field: '', value: '', file: null, type: 'file' },
        { field: '', value: '', file: null, type: 'file' },
      ],
      result: null,
    };
  }

  dofetch() {
    const params = { ...this.state };

    // 构造请求data
    if (this.state.isFormData) {
      const fd = new FormData();
      const formData = this.state.formData;
      formData.forEach((item) => {
        if (item.field && item.type === 'file' && item.file) {
          fd.append(item.field, item.file);
        }
        if (item.field && item.type === 'text' && item.value) {
          fd.append(item.field, item.value);
        }
      });
      params.data = fd;
    } else {
      params.data = JSON.parse(params.inputData);
    }

    fetchAPI({ ...params })
      .then((json) => {
        console.info('dofetch', json);
        this.setState({ result: JSON.stringify(json, undefined, 4) });
      })
      .catch((e) => {
        console.error('dofetch', e);
        this.setState({ result: JSON.stringify({ error: '请求失败，通过控制台查看' }, undefined, 4) });
      });
  }

  render() {
    // url/server/path 输入区域
    const urlInput = this.state.inner
      ? (
        <div>
          <Form.Item
            label="SERVER"
            labelCol="col-sm-2"
            controlCol="col-sm-10">
            <Select radius placeholder="请选择" value={this.state.server} onChange={(data) => { this.setState({ server: data.value }); }}>
              {
                this.servers.map(key => <Select.Option value={key} key={key}>{key}</Select.Option>)
              }
            </Select>
          </Form.Item>

          <Form.Item
            label="PATH"
            labelCol="col-sm-2"
            controlCol="col-sm-10"
            help="接口路径 众安wiki http://wiki.zhonganonline.com/pages/viewpage.action">
            <Input placeholder="请输入..." value={this.state.path} onChange={(e) => { this.setState({ path: e.target.value }); }} />
          </Form.Item>
        </div>
      )
      : (
        <Form.Item
          label="URL"
          labelCol="col-sm-2"
          controlCol="col-sm-10"
          help="外部接口请求，如提供地址url，将优先使用url地址去请求">
          <Input placeholder="请输入..." value={this.state.url} onChange={(e) => { this.setState({ url: e.target.value }); }} />
        </Form.Item>
      );
    // do post or put
    const doPoP = ['POST', 'PUT'].includes(this.state.method.toUpperCase());
    // json请求类型
    const textInput = (
      <Form.Item
        label="请求数据"
        labelCol="col-sm-2"
        controlCol="col-sm-10"
        help="json格式填写">
        <Input type="textarea" rows="5" cols="80" value={this.state.inputData} onChange={(e) => { this.setState({ inputData: e.target.value }); }} />
      </Form.Item>
    );
    // 表单请求类型，待优化
    const formInput = (
      <Form.Item
        label="请求数据"
        labelCol="col-sm-2"
        controlCol="col-sm-10">
        <table className="input-table">
          <thead>
            <tr>
              <th>字段名</th>
              <th>字段值</th>
              <th>类型</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.formData.map((data, index) => {
                return (
                  <tr key={`index-${index}`}>
                    <td>
                      <input
                        value={data.field}
                        onChange={(e) => {
                          const formData = this.state.formData[index];
                          formData.field = e.target.value;
                          this.setState(formData);
                        }}
                        />
                    </td>
                    <td>
                      {
                        this.state.formData[index].type === 'file' ? (
                          <input
                            type={data.type}
                            onChange={(e) => {
                              const formData = this.state.formData[index];
                              formData.file = e.target.files[0];
                              this.setState(formData);
                            }}
                            />
                        ) : (
                          <input
                            type={data.type} value={data.value}
                            onChange={(e) => {
                              const formData = this.state.formData[index];
                              formData.value = e.target.value;
                              this.setState(formData);
                            }}
                            />
                        )
                      }
                    </td>
                    <td>
                      <Select
                        placeholder="请选择" value={data.type}
                        onChange={(value) => {
                          const formData = this.state.formData[index];
                          formData.type = value.value;
                          this.setState(formData);
                        }}>
                        <Select.Option value="file">File</Select.Option>
                        <Select.Option value="text">Text</Select.Option>
                      </Select>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </Form.Item>
    );

    return (
      <div className="page-tool">
        <h2 className="title-middle">接口调试</h2>
        <Form type="horizontal">
          <Form.Item
            label="内置请求"
            labelCol="col-sm-2"
            controlCol="col-sm-10"
            theme="error">
            <Switch
              isCheckedText="是" unCheckedText="否" defaultValue={this.state.inner}
              onChange={(value) => { this.setState({ inner: value }); }}
              />
          </Form.Item>

          {urlInput}

          <Form.Item
            label="包含cookies"
            labelCol="col-sm-2"
            controlCol="col-sm-10"
            theme="error">
            <Switch
              isCheckedText="是" unCheckedText="否" defaultValue={this.state.isInclude}
              onChange={(value) => { this.setState({ isInclude: value }); }}
              />
          </Form.Item>

          <Form.Item
            label="请求类型"
            labelCol="col-sm-2"
            controlCol="col-sm-10">
            <Radio.Group defaultValue={this.state.method} onChange={(e) => { this.setState({ method: e.target.value }); }}>
              <Radio value="GET">GET</Radio>
              <Radio value="POST">POST</Radio>
            </Radio.Group>
          </Form.Item>

          { doPoP &&
            <div>
              <Form.Item
                label="表单请求类型"
                labelCol="col-sm-2"
                controlCol="col-sm-10"
                theme="error">
                <Switch
                  isCheckedText="是" unCheckedText="否" defaultValue={this.state.isFormData}
                  onChange={(value) => { this.setState({ isFormData: value }); }}
                  />
              </Form.Item>
              {this.state.isFormData ? formInput : textInput}
            </div>
          }

          <Form.Item
            label
            labelCol="col-sm-2"
            controlCol="col-sm-10">
            <Button theme="info" onClick={() => { this.dofetch(); }}>提交</Button>
          </Form.Item>

          <Form.Item
            label="查看结果"
            labelCol="col-sm-2"
            controlCol="col-sm-10">
            <Input type="textarea" rows="15" cols="80" readOnly value={this.state.result} />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Page;
