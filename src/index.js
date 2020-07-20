import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Icon, Button } from "antd";

import "antd/dist/antd.css";

class MyForm extends React.Component {
  remove = k => {
    const { form, setHighlights } = this.props;
    const { setFieldsValue } = form;

    const keys = form.getFieldValue("keys");
    if (keys.length === 1) {
      return;
    }

    setHighlights(k, "");

    setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    const { setFieldsValue } = form;

    const keys = form.getFieldValue("keys");
    const highlights = form.getFieldValue("highlights");
    const nextKeys = keys.concat(highlights.length);
    setHighlights(keys.length, "");
    setFieldsValue({
      keys: nextKeys
    });
  };

  submit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, highlights } = values;
        console.log("Received values of form: ", values);
        console.log("Merged values:", keys.map(key => highlights[key]));
      }
    });
  };

  reset = () => {
    const { highlightsRecord, form } = this.props;
    var keys = [];
    for (var index = 0; index < highlightsRecord.length; index++) {
      keys.push(index);
      setHighlights(index, highlightsRecord[index]);
    }
    form.setFieldsValue({
      keys,
      highlights: highlightsRecord
    });
  };

  render() {
    const { highlights } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    var keys = getFieldValue("keys");
    if (keys === undefined) {
      keys = [];
      for (var index = 0; index < highlights.length; index++) {
        keys.push(index);
      }
    }
    getFieldDecorator("keys", { initialValue: keys });
    keys = getFieldValue("keys");

    const highlightsItems = keys.map((k, index) => (
      <Form.Item label={`Highlights ${index + 1}`} required={index < 2} key={k}>
        {getFieldDecorator(`highlights[${k}]`, {
          initialValue: highlights[index],
          rules: [
            {
              required: true
            }
          ]
        })(<Input.TextArea style={{ width: "90%" }} />)}
        {index > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="close-circle"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));

    return (
      <Form layout="horizontal" onSubmit={this.submit}>
        {highlightsItems}
        <Form.Item>
          <Button type="link" onClick={this.add} style={{ width: "60%" }}>
            <u> + Add New Highlights</u>
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={this.reset}>Reset</Button>
        </Form.Item>
      </Form>
    );
  }
}

const highlightsRecord = ["1111", "222222", "333333", "44444"];
var highlights = ["1111", "222222", "333333", "44444"];
const setHighlights = (index, value) => {
  highlights[index] = value;
};

const Myform = Form.create({ name: "dynamic_form_item" })(MyForm);
ReactDOM.render(
  <Myform
    highlightsRecord={highlightsRecord}
    highlights={highlights}
    setHighlights={setHighlights}
  />,
  document.getElementById("root")
);
