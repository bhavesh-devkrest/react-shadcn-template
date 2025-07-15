import { useAppConfig, useEnvironment, useFeatureFlags, useMetadata } from '../../hooks/use-app-config';
import { Button } from './button';

const ConfigDemo = () => {
    const config = useAppConfig();
    const features = useFeatureFlags();
    const metadata = useMetadata();
    const environment = useEnvironment();

    return (
        <div className="space-y-6 p-6 border border-muted rounded-lg">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-primary mb-2">App Configuration Demo</h2>
                <p className="text-sm text-muted-foreground">
                    This shows how to access and use the app configuration throughout your application
                </p>
            </div>

            {/* Environment Information */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Environment Info</h3>
                <div className="grid grid-cols-2 gap-4 p-3 bg-muted/50 rounded">
                    <div>
                        <p><strong>Environment:</strong> {config.utils.getEnvironment()}</p>
                        <p><strong>Is Dev:</strong> {environment.isDevelopment ? '✅' : '❌'}</p>
                        <p><strong>API URL:</strong> {config.utils.getApiBaseUrl()}</p>
                    </div>
                    <div>
                        <p><strong>Version:</strong> {metadata.version}</p>
                        <p><strong>Branch:</strong> {metadata.branch}</p>
                        <p><strong>Build Date:</strong> {new Date(metadata.buildDate).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>

            {/* Feature Flags */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Feature Flags</h3>
                <div className="grid grid-cols-2 gap-2">
                    {Object.entries(features).map(([feature, enabled]) => (
                        <div key={feature} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm capitalize">{feature.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className={enabled ? 'text-green-600' : 'text-red-600'}>
                                {enabled ? '✅' : '❌'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Analytics Status */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Analytics Status</h3>
                <div className="p-3 bg-muted/50 rounded">
                    <p><strong>Analytics Enabled:</strong> {config.utils.shouldLoadAnalytics() ? '✅' : '❌'}</p>
                    <div className="mt-2 space-y-1 text-sm">
                        <p>• GA4: {config.analytics.ga4.enabled ? '✅' : '❌'}</p>
                        <p>• Facebook: {config.analytics.facebook.enabled ? '✅' : '❌'}</p>
                        <p>• Hotjar: {config.analytics.hotjar.enabled ? '✅' : '❌'}</p>
                    </div>
                </div>
            </div>

            {/* I18n Configuration */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Internationalization</h3>
                <div className="p-3 bg-muted/50 rounded">
                    <p><strong>Default Language:</strong> {config.utils.getDefaultLanguage()}</p>
                    <p><strong>Supported:</strong> {config.utils.getSupportedLanguages().join(', ')}</p>
                    <p><strong>Locale:</strong> {config.i18n.locale}</p>
                    <p><strong>Timezone:</strong> {config.i18n.timeZone}</p>
                </div>
            </div>

            {/* Performance Hints */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Performance Configuration</h3>
                <div className="space-y-2">
                    <div className="p-2 bg-muted/30 rounded">
                        <p className="text-sm font-medium">DNS Prefetch ({config.performance.dnsPrefetch.length} domains)</p>
                        <p className="text-xs text-muted-foreground">
                            {config.performance.dnsPrefetch.slice(0, 2).join(', ')}...
                        </p>
                    </div>
                    <div className="p-2 bg-muted/30 rounded">
                        <p className="text-sm font-medium">Preload Resources ({config.performance.preload.length} items)</p>
                        <p className="text-xs text-muted-foreground">
                            Critical resources for faster loading
                        </p>
                    </div>
                </div>
            </div>

            {/* Utility Functions Demo */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Utility Functions</h3>
                <div className="flex gap-2 flex-wrap">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => console.log('Version Info:', config.utils.getVersionInfo())}
                    >
                        Log Version Info
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => console.log('SEO Data:', config.utils.getSEOData())}
                    >
                        Log SEO Data
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => console.log('Performance Hints:', config.utils.getPerformanceHints())}
                    >
                        Log Performance Hints
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => console.log('Security Headers:', config.utils.getSecurityHeaders())}
                    >
                        Log Security Headers
                    </Button>
                </div>
            </div>

            {/* Schema Data */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Schema.org Data</h3>
                <div className="p-3 bg-muted/50 rounded">
                    <p><strong>Organization:</strong> {config.schema.organization.name}</p>
                    <p><strong>Type:</strong> {config.schema.organization['@type']}</p>
                    <p><strong>Founded:</strong> {config.schema.organization.foundingDate}</p>
                    <p><strong>Employees:</strong> {config.schema.organization.numberOfEmployees}</p>
                </div>
            </div>

            {/* Usage Examples */}
            <div className="text-xs text-muted-foreground space-y-1">
                <p>💡 <strong>Usage Examples:</strong></p>
                <p>• Use <code>config.utils.isFeatureEnabled('enablePWA')</code> to conditionally render features</p>
                <p>• Use <code>config.utils.getEnvironment()</code> for environment-specific logic</p>
                <p>• Use <code>config.utils.shouldLoadAnalytics()</code> before loading tracking scripts</p>
                <p>• Access any config with <code>useAppConfig()</code> hook in any component</p>
            </div>
        </div>
    );
};

export default ConfigDemo; 