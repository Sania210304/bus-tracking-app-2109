import React, { useState } from 'react';
import { TabType } from './types';
import { ProjectDetailsScreen } from './components/ProjectDetailsScreen';
import { FleetOverviewScreen } from './components/FleetOverviewScreen';
import { MetricsScreen } from './components/MetricsScreen';
import { StackScreen } from './components/StackScreen';
import { ContactScreen } from './components/ContactScreen';
import { BottomNavBar } from './components/BottomNavBar';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('portfolio');

  const handleLaunchFleetMonitor = () => {
    setActiveTab('fleet-monitor');
  };

  const handleSelectTechStackTag = (_tag: string) => {
    setActiveTab('stack');
  };

  return (
    <div className="bg-[#101415] min-h-screen text-[#e0e3e5] relative selection:bg-[#3776ab] selection:text-white">
      {/* Active Screen View */}
      {activeTab === 'fleet-monitor' ? (
        <FleetOverviewScreen onBackToPortfolio={() => setActiveTab('portfolio')} />
      ) : activeTab === 'portfolio' ? (
        <ProjectDetailsScreen
          onLaunchFleetMonitor={handleLaunchFleetMonitor}
          onSelectTechStackTag={handleSelectTechStackTag}
          onGoBack={() => setActiveTab('portfolio')}
        />
      ) : activeTab === 'metrics' ? (
        <MetricsScreen />
      ) : activeTab === 'stack' ? (
        <StackScreen />
      ) : (
        <ContactScreen />
      )}

      {/* Bottom Navigation Bar (Hidden when inside full-screen Fleet Monitor for maximum map space, or visible with quick toggle) */}
      {activeTab !== 'fleet-monitor' && (
        <BottomNavBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLaunchFleetMonitor={handleLaunchFleetMonitor}
        />
      )}
    </div>
  );
}
