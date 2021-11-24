export default function styleGenerator () {
  const code = `<style lang="scss" scoped>
.breadcrumb {
  background-color: #fff;
  padding-left: 10px;
  box-shadow: 0 1px 0 0 rgb(203 203 203 / 50%);
}
.info-wrap {
  height: calc(100vh - 80px);
  margin: 20px;
  padding: 20px;
  overflow: auto;
  background-color: white;
  box-shadow: 0 1px 4px 0 rgba(202, 202, 202, 0.5);
  box-sizing: border-box;
  .info-title {
    font-size: 0;
    padding-bottom: 20px;
    .icon-tongyongbiaotiicon {
      font-size: 16px;
      color: #198eeb;
    }
    .text {
      margin-left: 10px;
      font-size: 14px;
      color: #333;
    }
  }
}
.search-wrap {
  display: flex;
  flex-wrap: wrap;
  .option-item {
    display: flex;
    align-items: center;
    margin-right: 20px;
    padding-bottom: 20px;
    &:last-child {
      margin-right: 0;
    }
    .label {
      padding-right: 10px;
      width: auto;
      flex-shrink: 0;
      font-size: 14px;
      color: #666;
      text-align: right;
    }
  }
}
.pagination-wrap{
  display: flex;
  flex-direction: row-reverse;
  margin-top:20px;
}
</style>
`
  return code
}