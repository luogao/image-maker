# icon-maker

根据提供的图片，生成不同尺寸（尺寸可配置）的图片的命令行工具

# Setup

克隆这个项目

```bash
$ npm install && sudo npm link
```

# Usage

- 默认

  ```bash
  $ im make <target>
  ```

  这里`target` 指的是目标图片，输出的路径默认为当前文件夹的`im-output`

- 指定输出路径
  
  ```bash
  $ im make <target> -o [path]
  ```
   这里`path` 指的是输出的路径（文件夹）

# Todo

- [ ] 输出的文件名可配置
