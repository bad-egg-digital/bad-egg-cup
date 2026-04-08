import './index.scss';

import domReady from '@wordpress/dom-ready';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

import defaultsColours from './json/defaults-colours.json';
import defaultsAddress from './json/defaults-address.json';
import defaultsCompanyInfo from './json/defaults-company-info.json';
import defaultsIntegrations from './json/defaults-integrations.json';
import defaultsSupports from './json/defaults-supports.json';

import CardSupports from './components/CardSupports';
import SectionColours from './components/SectionColours';
import SectionCompany from './components/SectionCompany';
import SectionSocials from './components/SectionSocials';
import SectionIntegrations from './components/SectionIntegrations';

import {
  createRoot,
  useState,
  useEffect,
} from '@wordpress/element';

import {
  Panel,
  Flex,
  FlexItem,
  FlexBlock,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
  Button,
  __experimentalSpacer as Spacer,
  __experimentalHeading as Heading,
  NoticeList,
} from '@wordpress/components';

defaultsCompanyInfo.address = defaultsAddress;
defaultsCompanyInfo.addressMailing = defaultsAddress;

const Notices = () => {
  const { removeNotice } = useDispatch( noticesStore );
  const notices = useSelect( ( select ) =>
    select( noticesStore ).getNotices()
  );

  if ( notices.length === 0 ) {
      return null;
  }

  return <NoticeList notices={ notices } onRemove={ removeNotice } />;
};

const OptionsPage = () => {
  const [ loadState, setLoadState ] = useState(false);
  const [ savingSettings, setSavingSettings ] = useState(false);

  const [ colours, setColours ] = useState( defaultsColours );
  const [ company, setCompany ] = useState( defaultsCompanyInfo );
  const [ integrations, setIntegrations ] = useState( defaultsIntegrations );
  const [ supports, setSupports ] = useState( defaultsSupports );

  const { createSuccessNotice } = useDispatch( noticesStore );

  useEffect( () => {
    apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
      setLoadState(true);

      if(settings?.badeggcup?.supports) {
        setSupports( settings.badeggcup.supports );
      }

    } );
  }, [] );

  const SaveButton = () => {
    return (
      <Button
        variant={ (savingSettings) ? 'secondary' : 'primary' }
        onClick={ saveSettings }
        __next40pxDefaultSize
      >
        { (savingSettings) ? __( 'Saving ...', 'badeggcup' ) : __( 'Save settings', 'badeggcup' ) }
      </Button>
    );
  };

  const saveSettings = () => {
    setSavingSettings(true);

    apiFetch( {
      path: '/wp/v2/settings',
      method: 'POST',
      data: {
        badeggcup: {
          colours,
          company,
          integrations,
          supports,
        }
      },
    }).then( () => {
      setSavingSettings(false);
      createSuccessNotice(
        __( 'Settings saved.', 'badeggcup' )
      );
    });
  };

  return (
    <>
      <Heading level={ 1 }>
        { __( 'Website Options', 'badeggcup' ) }
      </Heading>
      <Spacer />
      <Notices />
      <Spacer />

      <Flex wrap={ true } align="stretch" gap="4" className="badeggcup-options-wrap">
        <Panel className="badeggcup-panel">
          { supports.colours ? <SectionColours colours={ colours } setColours={ setColours } /> : null }
          { supports.company ? <SectionCompany supports={ supports } company={ company } setCompany={ setCompany } /> : null }
          { supports.companySocials ? <SectionSocials company={ company } setCompany={ setCompany } /> : null }
          { supports.integrations ? <SectionIntegrations supports={ supports } integrations={ integrations } setIntegrations={ setIntegrations } /> : null }
        </Panel>

        <FlexBlock className="badeggcup-theme-supports">
          <Card>
            <CardHeader>
              <Heading level={ 2 } size="13">
                { __( 'Theme Support', 'badeggcup' ) }
              </Heading>
            </CardHeader>
            <CardBody>
              { !loadState ? (
                <Spinner />
              ) : (
                <CardSupports supports={ supports } setSupports={ setSupports } />
              ) }
            </CardBody>
            <CardFooter>
              <Flex>
                <FlexItem>
                  { savingSettings ? <Spinner /> : null }
                </FlexItem>
                <FlexItem>
                  <SaveButton />
                </FlexItem>
              </Flex>
            </CardFooter>
          </Card>
        </FlexBlock>
      </Flex>
    </>
  );
};

domReady( () => {
    const root = createRoot(
        document.getElementById( 'badeggcup-options' )
    );

    root.render( <OptionsPage /> );
} );
