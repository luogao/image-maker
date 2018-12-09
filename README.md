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


```bash
$ im tiny <target>
```

这里`target` 指的是目标图片，输出的路径默认为当前文件所在的路径，默认输出文件名为`target`的原名前加上`test-`，这个指令是通过`tinify`提供的API，并且这里每个月只能进行500张图的压缩。详情请查询其[官网](https://tinypng.com/developers)

```bash
$ im base64 <target>
```

这里`target` 指的是目标图片，输出的是包含base64结果的`base64-result.txt`文件，默认输出结果文件路径名为`target`的所在路径，这里`target`图片尺寸不得大于**500KB**


# Todo

- [ ] 输出的文件名可配置
