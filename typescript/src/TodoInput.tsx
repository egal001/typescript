import React from "react";
import { Input, Select, DatePicker } from "antd";
import { Moment } from "moment";

import { userList } from "./utils/data";

const { Option } = Select;

enum Id {
  tuture = "666666666",
  mRcfps = "23410977",
  crxk = "25455350",
  pftom = "23410976",
  holy = "58352313"
}

export interface TodoValue {
  content?: string;
  user?: Id;
  date?: string;
}

interface TodoInputProps {
  value?: TodoValue;
  onChange?: (value: TodoValue) => void;
}

interface TodoInputState {
  content: string;
  user: Id;
  date: string;
}

class TodoInput extends React.Component<TodoInputProps, TodoInputState> {
  setState(arg0: { content: any; }) {
    throw new Error("Method not implemented.");
  }
  state = {
    content: "",
    user: Id.tuture,
    date: ""
  };

  private triggerChange = (changedValue: TodoValue) => {
    const { content, user, date } = this.state;
    const { value, onChange } = this.props;

    if (onChange) {
      onChange({ content, user, date, ...value, ...changedValue });
    }
  };

  private onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value = {} } = this.props;

    if (!("content" in value!)) {
      console.log("hello");
      this.setState({
        content: e.target.value
      });
    }

    this.triggerChange({ content: e.target.value });
  };

  private onUserChange = (selectValue: Id) => {
    const { value = {} } = this.props;

    if (!("user" in value!)) {
      this.setState({
        user: selectValue
      });
    }

    this.triggerChange({ user: selectValue });
  };

  private onDateOk = (date: Moment) => {
    const { value = {} } = this.props;
    if (!("date" in value!)) {
      this.setState({
        date: date.format("YYYY-MM-DD HH:mm")
      });
    }

    this.triggerChange({ date: date.format("YYYY-MM-DD HH:mm") });
  };
  props!: { value: any; onChange: any; };

  public render() {
    const { value } = this.props;
    const { content, user } = this.state;
    return (
      <div className="todoInput">
        <Input
          type="text"
          placeholder="asda"
          value={value?.content || content}
          onChange={this.onContentChange}
        />
        <Select
          style={{ width: 80 }}
          size="small"
          defaultValue={Id.tuture}
          value={value?.user || user}
          onChange={this.onUserChange}
        >
          {userList.map(user => (
            <Option value={user.id}>{user.name}</Option>
          ))}
        </Select>
        <DatePicker
          showTime
          size="small"
          onOk={this.onDateOk}
          style={{ marginLeft: "16px", marginRight: "16px" }}
        />
      </div>
    );
  }
}

export default TodoInput;
