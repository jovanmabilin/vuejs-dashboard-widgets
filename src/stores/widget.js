import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'
import forEach from 'lodash/forEach';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        // highestRow: {
        //     0: 0,
        //     1: 0,
        //     2: 0
        // },
        gridLayout: {
            options:{
                marginX: 10,
                marginY: 10,
                column: 3,
                rowHeight: 20,
                isDraggable: true,
                isResizable: true,
                isMirrored: false,
                verticalCompact: true,
                horizontalCompact: true,
                autoSize: true,
                useCssTransforms: true
            }
        },
        
        dashboardWidgets:[],
        widgetLists: [],
        dashboardWidgetInfo: {},
        currentWidgetId: null
    },
    getters:{
        getDashboardWidgets:    state => state.dashboardWidgets.filter(({component}) => component.isAdded == true),
        getWidgetLists:         state => state.widgetLists.filter(({isAdded}) => isAdded == false),
        getDashboardWidgetInfo: state => state.dashboardWidgetInfo,
        // getHighestRow:          state => state.highestRow,
        getGridLayoutOptions:   state => state.gridLayout.options,
    },
    mutations:{
        addWidgetForm(state,payload) {
            const column            = ( x )   => state.dashboardWidgets.filter( element => element.x === x ).sort( ( a,b ) => a.y - b.y );
            const getHighestOrder   = ( c )   => c.map( elements => elements.h ).reduce( ( a,b ) => a + b , 0 );
            const getOrder          = ( x,y ) => column( x ).hasOwnProperty( y ) ?  column( x )[y].y : getHighestOrder(  column( x ) );

            state.currentWidgetId = state.currentWidgetId + 1;

            payload.y = getOrder(payload.x,payload.y);
            payload.i = state.currentWidgetId.toString();

            let form = {
                i: payload.i, 
                x: payload.x, 
                y: payload.y,
                w: payload.w, 
                h: payload.h, 
                component: {
                    id: payload.id,
                    title: payload.title, 
                    isAdded: payload.isAdded
                },
            };
            state.dashboardWidgets.push(form);
        },
        addWidget(state,payload) {
            let form = {
                    id: 'dash-' + payload.id,
                    title: payload.title, 
                    isAdded: false
            };
            state.widgetLists.push(form);
        },
        // findColumnHighestRow(state){
        //     let column1 = 0,column2 = 0, column3 = 0;
        //     const accumulator = (x,x1,c,h) => (x === x1) ? c + h : c ;
     
        //     state.dashboardWidgets.map(widget => {
        //         column1 = accumulator(widget.x,0,column1,widget.h);
        //         column2 = accumulator(widget.x,1,column2,widget.h);
        //         column3 = accumulator(widget.x,2,column3,widget.h);
        //      });

        //      state.highestRow = {
        //          0: column1,
        //          1: column2,
        //          2: column3
        //      }
        // },
        createDashboardWidgetInfo(state,payload){
            let found = state.dashboardWidgets.find( element => element.i == payload.i);
            if ( found ) {
                state.dashboardWidgetInfo.id = payload.id;
                state.dashboardWidgetInfo.title = payload.title;
                state.dashboardWidgetInfo.isAdded = payload.isAdded;
            }
        },
        updateWidget(state,payload) {
            let found = state.widgetLists.find( element => element.id == payload.id);
            if ( found ) {
                state.widgetLists = {
                    id: payload.id,
                    title: payload.title,
                    isAdded: payload.isAdded
                }
            }
        },
        deleteDashboardWidget(state,payload) {
            state.dashboardWidgets.splice(payload,1);
        },
        deleteWidget(state,payload) {
            state.widgetLists.splice(payload,1);
        },
        updateCurrentWidgetId: (state) => {
            let length = state.dashboardWidgets.length;
            const isSame = ( l,l1 ) => l === l1 ;
            state.currentWidgetId = isSame(length,0) ? 0 : Number(state.dashboardWidgets[length-1].i);
        },
        dashboardWidgets: (state,payload) => {
            state.dashboardWidgets = [];
            forEach( payload, (i) => {
                state.dashboardWidgets.push(i);
            });
        },
        widgetLists: (state,payload) => {
            state.widgetLists = [];
            forEach( payload, (i) => {
                state.widgetLists.push(i);
            });
        },
    },
    actions: {
        dashboardWidgets( {commit}, payload ){

            payload = [
                {
                    i: '1', 
                    x: 0, 
                    y: 20,
                    w: 1, 
                    h: 5, 
                    component:{
                        id: 'dash-SampleName',
                        title: 'Serenity ',
                        isAdded: true,
                    },
                },
                {
                    i: '0', 
                    x: 0, 
                    y:0,
                    w: 1, 
                    h: 20, 
                    component:{
                        id: 'dash-Loren',
                        title: 'Google Charts',
                        isAdded: true,
                    },
                },
                {
                    i: '2', 
                    x: 1, 
                    y: 0,
                    w: 1, 
                    h: 20, 
                    component:{
                        id: 'dash-Serendipity',
                        title: 'Serendipity ',
                        isAdded: true,
                    },
                },
                {
                    i: '3', 
                    x: 1, 
                    y: 20,
                    w: 1, 
                    h: 20, 
                    component:{
                        id: 'dash-Wonderful',
                        title: 'A Wonderful World ',
                        isAdded: true,
                    },
                },
                {
                    i: '4', 
                    x: 2, 
                    y: 0,
                    w: 1, 
                    h: 20, 
                    component:{
                        id: 'dash-Serendipity',
                        title: 'Serendipity ',
                        isAdded: true,
                    },
                },
                {
                    i: '5', 
                    x: 2, 
                    y: 20,
                    w: 1, 
                    h: 20, 
                    component:{
                        id: 'dash-Wonderful',
                        title: 'A Wonderful World ',
                        isAdded: true,
                    },
                },
            ]

            commit('dashboardWidgets',payload)
        },
        widgetLists( {commit}, payload ){

            payload = [
                {
                    id: 'dash-Loren', 
                    title: 'Google Charts', 
                    isAdded: false
                },
                {
                    id: 'dash-Serenity', 
                    title: 'Serenity', 
                    isAdded: false
                },
                {
                    id: 'dash-Serendipity', 
                    title: 'Serendipity', 
                    isAdded: false
                },
                {
                    id: 'dash-Wonderful', 
                    title: 'A Wonderful World', 
                    isAdded: false
                },
            ]

            commit('widgetLists',payload)
        },
        
        addWidgetForm: ({commit},payload) => {
            commit('addWidgetForm',payload);
            // commit('findColumnHighestRow');
        },
        addWidget: ({commit},payload) => {
            commit('addWidget',payload);
        },
        updateWidget: ({commit},payload) => {
            commit('updateWidget',payload);
            // commit('findColumnHighestRow');
        },
        deleteDashboardWidget: ({commit},payload) => {
            commit('deleteDashboardWidget',payload);
            // commit('findColumnHighestRow');
        },
        // findColumnHighestRow: ({commit}) => {
        //     commit('findColumnHighestRow');
        // },
        updateCurrentWidgetId: ({commit}) => {
            commit('updateCurrentWidgetId');
        },
    }
});