import * as React from 'react';
import { Modal, TabPanel } from '../../components';

const panels = [
    {
        label: 'LEGAL NOTES',
        content: (
            <div className={'tabs-content'}>
                LEGAL NOTES
            </div>
        ),
    },
    {
        label: 'PRIVACY POLICY',
        content: (
            <div id="privacy-policy" className="tabs-content">
                Política de Privacidade
            </div>
        ),
    },
    {
        label: 'TERM OF SERVICE',
        content: (
            <div className={'tabs-content'}>
                Termos de Uso
            </div>
        ),
    },
];

export interface LegalDocumentsProps {
    isOpen: boolean;
    footer: React.ReactNode;
}

interface State {
    currentTabIndex: number;
}

class LegalDocuments extends React.Component<LegalDocumentsProps, State> {
    public state = {
        currentTabIndex: 0,
    };

    public render() {
      return(
          <Modal
              className={'pg-legal-docs-modal'}
              show
              header={<h3>Title</h3>}
              content={this.renderModalBody()}
              footer={this.props.footer}
          />
      );
    }

    private onCurrentTabChange = index => this.setState({ currentTabIndex: index });

    private renderModalBody = () => {
        return(
            <div>
                <TabPanel panels={panels} currentTabIndex={this.state.currentTabIndex} onCurrentTabChange={this.onCurrentTabChange}/>
            </div>
        );
    };
}

export {
    LegalDocuments,
};
