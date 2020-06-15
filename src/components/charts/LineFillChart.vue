<template>
  <div class="drawing-section" ref="chartdiv">
    
  </div>
</template>

<script>
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4charts from "@amcharts/amcharts4/charts";
  import am4themes_animated from "@amcharts/amcharts4/themes/animated";

  am4core.useTheme(am4themes_animated);

  export default {
    name: 'LineFillChart',
    props: {
      item: {
        type: Object,
        default: () => ({
          href: undefined,
          icon: undefined,
          subtitle: undefined,
          title: undefined,
          to: undefined,
        }),
      },
      text: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        hoverStatus: false
      }
    },

    methods: {
      generateChartData() {
        var chartData = [];
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 100);
        firstDate.setHours(0, 0, 0, 0);

        var visits = 128;
        var hits = 12;
        var views = 200;

        for (var i = 0; i < 10; i++) {
          // we create date objects here. In your data, you can have date strings
          // and then set format of your dates using chart.dataDateFormat property,
          // however when possible, use date objects, as this will speed up chart rendering.
          var newDate = new Date(firstDate);
          newDate.setDate(newDate.getDate() + (182*i));

          visits += Math.round((Math.random()<0.5?1:-1)*Math.random()*2);
          hits += Math.round((Math.random()<0.5?1:-1)*Math.random()*2);
          views += Math.round((Math.random()<0.5?1:-1)*Math.random()*2 );
          chartData.push({
            date: newDate.toISOString().substring(0, 10),
            visits: visits,
            hits: hits,
            views: views
          });
        }
        return chartData;
      },

      createAxisAndSeries(field, name, opposite, bullet, chart) {
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        // series.strokeWidth = 2;
        // series.yAxis = valueAxis;
        series.name = name;
        series.tooltipText = "{name}: [bold]{valueY}[/]";
        series.tensionX = 0.8;
        series.fillOpacity = 0.3;

        var interfaceColors = new am4core.InterfaceColorSet();

        switch(bullet) {

          default:
            // var bullet = series.bullets.push(new am4charts.CircleBullet());
            // bullet.circle.stroke = interfaceColors.getFor("background");
            // bullet.circle.strokeWidth = 2;
            break;
        }

        // valueAxis.renderer.line.strokeOpacity = 1;
        // valueAxis.renderer.line.strokeWidth = 2;
        valueAxis.renderer.line.stroke = series.stroke;
        // valueAxis.renderer.labels.template.fill = series.stroke;
        // valueAxis.renderer.opposite = opposite;
        valueAxis.renderer.grid.template.disabled = true;
      }
    },

    mounted() {
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

      chart.paddingRight = 20;

      let data = this.generateChartData();

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 50;

      this.createAxisAndSeries("visits", "Systolic", false, "circle", chart);
      this.createAxisAndSeries("views", "Diastolic", true, "circle", chart);
      this.createAxisAndSeries("hits", "Hit", true, "circle", chart);

      chart.cursor = new am4charts.XYCursor();

      // let scrollbarX = new am4charts.XYChartScrollbar();
      // scrollbarX.series.push(series);
      // chart.scrollbarX = scrollbarX;

      this.chart = chart;
    },

    beforeDestroy() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
  }
</script>

<style lang="sass" scoped>
.drawing-section
  height: 300px

</style>
