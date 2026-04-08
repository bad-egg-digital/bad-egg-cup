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
  PanelBody,
  Flex,
  FlexItem,
  FlexBlock,
  Card,
  CardHeader,
  CardBody,
  CardDivider,
  CardFooter,
  ColorPalette,
  TextControl,
  CheckboxControl,
  Spinner,
  Button,
  __experimentalSpacer as Spacer,
  __experimentalDivider as Divider,
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
      <Flex>
        <Heading level={ 1 }>
          { __( 'Website Options', 'badeggcup' ) }
        </Heading>
      </Flex>

      <Spacer />
      <Notices />
      <Spacer />

      <Flex wrap={ true } align="flex-start" gap="4" className="badeggcup-options-wrap">
        <FlexBlock className="badeggcup-panel">
          <Panel>
            { (supports.colours) ? (
              <SectionColours colours={ colours } setColours={ setColours } />
            ) : null }

            <SectionCompany supports={ supports } company={ company } setCompany={ setCompany } />

            { supports.companySocials ? (
              <SectionSocials company={ company } setCompany={ setCompany } />
            ) : null }

            <SectionIntegrations supports={ supports } integrations={ integrations } setIntegrations={ setIntegrations } />

          </Panel>
        </FlexBlock>

        <FlexBlock className="badeggcup-theme-supports">
          <Card>
            <CardHeader>
              <Heading level={ 2 } size="13">
                { __( 'Theme Support', 'badeggcup' ) }
              </Heading>
            </CardHeader>
            <CardBody>
              { !loadState ? <Spinner /> : (
                <>
                  <FlexItem>
                    <CheckboxControl
                      label={ __( 'Brand Colours', 'badeggcup' ) }
                      checked={ supports.colours }
                      onChange={ ( value => setSupports({ ...supports, colours: value }) ) }
                      __nextHasNoMarginBottom
                    />

                    <CheckboxControl
                      label={ __( 'Social Channels', 'badeggcup' ) }
                      checked={ supports.companySocials }
                      onChange={ ( value => setSupports({ ...supports, companySocials: value }) )}
                      __nextHasNoMarginBottom
                    />

                    <CheckboxControl
                      label={ __( 'Company Info', 'badeggcup' ) }
                      checked={ supports.company }
                      onChange={ ( value => {
                        setSupports({ ...supports, company: value });

                        if(!value) {
                          setSupports({
                            ...supports,
                            company: false,
                            companyAddress: false,
                            companyAddressMailing: false,
                          });
                        }

                      } ) }
                      __nextHasNoMarginBottom
                    />

                    {
                      (supports.company) ? (
                        <>
                          <CheckboxControl
                            label={ __( 'Address', 'badeggcup' ) }
                            checked={ supports.companyAddress }
                            onChange={ ( value => {
                              setSupports({ ...supports, companyAddress: value });

                              if(!value) {
                                setSupports({
                                  ...supports,
                                  companyAddress: false,
                                  companyAddressMailing: false,
                                });
                              }

                            } ) }
                            __nextHasNoMarginBottom
                          />
                        </>
                      ) : null
                    }

                    {
                      (supports.companyAddress) ? (
                        <CheckboxControl
                          label={ __( 'Mailing Address', 'badeggcup' ) }
                          checked={ supports.companyAddressMailing }
                          onChange={ ( value => setSupports({ ...supports, companyAddressMailing: value }) ) }
                          __nextHasNoMarginBottom
                        />
                      ) : null
                    }

                  </FlexItem>
                  <FlexItem>
                    <CheckboxControl
                      label={ __( 'Built-in Post Type', 'badeggcup' ) }
                      checked={ supports.defaultPost }
                      onChange={ ( value => {
                        setSupports({ ...supports, defaultPost: value });

                        if(!value) {
                          setSupports({
                            ...supports,
                            defaultPost: false,
                            postCategory: false,
                            postTag: false,
                          });
                        }

                      } ) }
                      __nextHasNoMarginBottom
                    />

                    {
                      (supports.defaultPost) ? (
                        <>
                          <CheckboxControl
                            label={ __( 'Post Tags', 'badeggcup' ) }
                            checked={ supports.postTag }
                            onChange={ ( value => setSupports({ ...supports, postTag: value }) ) }
                            __nextHasNoMarginBottom
                          />
                          <CheckboxControl
                            label={ __( 'Post Categories', 'badeggcup' ) }
                            checked={ supports.postCategory }
                            onChange={ ( value => setSupports({ ...supports, postCategory: value }) ) }
                            __nextHasNoMarginBottom
                          />
                        </>
                      ) : null
                    }

                    <CheckboxControl
                      label={ __( 'Comments', 'badeggcup' ) }
                      checked={ supports.comments }
                      onChange={ ( value => setSupports({ ...supports, comments: value }) ) }
                      __nextHasNoMarginBottom
                    />

                  </FlexItem>
                  <FlexItem>
                    <CheckboxControl
                      label={ __( 'Third-party Integrations', 'badeggcup' ) }
                      checked={ supports.integrations }
                      onChange={ ( value => {
                        setSupports({ ...supports, integrations: value });

                        if(!value) {
                          setSupports({
                            ...supports,
                            integrations: false,
                            integrationsFathom: false,
                            integrationsPlausible: false,
                          });
                        }

                      } ) }
                      __nextHasNoMarginBottom
                    />

                    {
                      (supports.integrations) ? (
                        <>
                          <CheckboxControl
                            label={ __( 'Plausible Analytics', 'badeggcup' ) }
                            checked={ supports.integrationsPlausible }
                            onChange={ ( value => setSupports({ ...supports, integrationsPlausible: value }) ) }
                            __nextHasNoMarginBottom
                          />
                          <CheckboxControl
                            label={ __( 'Fathom Analytics', 'badeggcup' ) }
                            checked={ supports.integrationsFathom }
                            onChange={ ( value => setSupports({ ...supports, integrationsFathom: value }) ) }
                            __nextHasNoMarginBottom
                          />
                        </>
                      ) : null
                    }

                  </FlexItem>
                </>
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
