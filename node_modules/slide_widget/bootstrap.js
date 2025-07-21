const config = require('config');

module.exports = () => {
    // Register our greeting widget
    const slideWidget = {
        slide_widget: {
            setting_component:
                'slide_widget/components/widget/SlideWidgetSetting.jsx',
            component:
                'slide_widget/components/widget/SlideWidget.jsx',
            name: 'My Slides Widget',
            description: 'A simple Slide widget',
            default_settings: {
                
            },
            enabled: true
        }
    };
    config.util.setModuleDefaults('widgets', slideWidget);
}
