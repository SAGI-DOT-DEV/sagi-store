'use client';
import {useState} from 'react';
import {useAuth} from '../../../context/AuthContext';
import {useAdminReport} from '../../../hooks/useAdminReport';
import {overviewRange,exportSalesCsv,type OverviewPeriod} from '../../../services/admin/overview.utils';
import {DashboardHeader} from './DashboardHeader';
import {DashboardMetrics} from './DashboardMetrics';
import {DashboardCharts} from './DashboardCharts';
import {DashboardOperations} from './DashboardOperations';
import {ReportState} from './ReportState';

export default function Dashboard(){
 const {accessToken}=useAuth();
 const [period,setPeriod]=useState<OverviewPeriod>('6m');
 const [range,setRange]=useState(()=>overviewRange('6m'));
 const [revision,setRevision]=useState(0);
 const sales=useAdminReport('sales',range.query,accessToken,revision);
 const products=useAdminReport('performance',range.query,accessToken,revision);
 const inventory=useAdminReport('inventory','',accessToken,revision);
 const operations=useAdminReport('operations','',accessToken,revision);
 const retry=()=>setRevision(value=>value+1);
 function changePeriod(value:OverviewPeriod){setPeriod(value);setRange(overviewRange(value));}
 function refresh(){setRange(overviewRange(period));retry();}
 return <div className="p-admin-margin-mobile md:p-admin-margin-desktop flex flex-col gap-12">
 <DashboardHeader period={period} onPeriod={changePeriod} onRefresh={refresh} onExport={()=>{if(sales.data)exportSalesCsv(sales.data,range.months);}} canExport={Boolean(sales.data)} />
 <ReportState {...sales} retry={retry}>{sales.data&&<DashboardMetrics sales={sales.data}/>}</ReportState>
 <DashboardCharts sales={sales} products={products} months={range.months} retry={retry}/>
 <DashboardOperations inventory={inventory} operations={operations} retry={retry}/>
 </div>;
}
