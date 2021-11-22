# wow-code
Gnerator Vue SFC Quickly

## Install
```shell
yarn global add wow-code
# or
npm install -g wow-code
```
## CLI
```shell
# output version
wow-code -V
# generator file
wow-code g <file-path> -c <config-path>
# start GUI
wow-code ui -p <port>
```

## Config File
the config file is JSON,which like this:
```json
{
  "breadcrumbList": ["业务订单", "检查预约"],
  "searchList": [
    {
      "type": "input",
      "label": "姓名",
      "param": "name",
    }
  ],
  "tableList": [
    {
      "label": "姓名",
      "props": "name"
    }
  ]
}
```

## Develop
```shell
# start GraphQL Server 
yarn install
npm link
cd ui && yarn install && yarn build
wow-code ui -p <port>

# start Vue in dev
cd ui && yarn dev
```