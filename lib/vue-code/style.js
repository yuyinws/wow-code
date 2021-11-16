export default function styleGenerator () {
  const code = `<style lang="scss" scoped>
  .info-wrap {
    height: calc(100vh - 135px);
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
</style>
`
  return code
}