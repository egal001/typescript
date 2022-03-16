import React from "react";
import { List, Avatar, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { ClickParam } from "antd/lib/menu";

import { Todo, getUserById } from "./utils/data";

export type MenuKey = "complete" | "delete";

interface ActionProps {
  onClick: (key: MenuKey) => void;
  isCompleted: boolean;
}

function Action({ onClick, isCompleted }: ActionProps) {
  const handleActionClick = ({ key }: ClickParam) => {
    if (key === "complete") {
      onClick("complete");
    } else if (key === "delete") {
      onClick("delete");
    }
  };

  return (
    <Menu onClick={handleActionClick}>
      <Menu.Item key="complete">{isCompleted ? "si" : "ae"}</Menu.Item>
      <Menu.Item key="delete"></Menu.Item>
    </Menu>
  );
}

interface TodoListProps {
  todoList: Todo[];
  onClick: (todoId: string, key: MenuKey) => void;
}

function TodoList({ todoList, onClick }: TodoListProps) {
  return (
    <List
      className="loadmore-list"
      itemLayout="horizontal"
      dataSource={todoList}
      renderItem={(item: { user: string; id: string; isCompleted: boolean; content: any; }) => {
        const user = getUserById(item.user);

        return (
          <List.Item
            key={item.id}
            actions={[
              <Dropdown
                overlay={() => (
                  <Action
                    isCompleted={item.isCompleted}
                    onClick={(key: MenuKey) => onClick(item.id, key)}
                  />
                )}
              >
                <a key="list-loadmore-more">
                   <DownOutlined />
                </a>
              </Dropdown>
            ]}
          >
          
          </List.Item>
        );
      }}
    />
  );
}

export default TodoList;
