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

  const [ colours, setColours ] = useState( defaultsColours );
  const [ company, setCompany ] = useState( defaultsCompanyInfo );
  const [ integrations, setIntegrations ] = useState( defaultsIntegrations );
  const [ supports, setSupports ] = useState( defaultsSupports );

  const { createSuccessNotice } = useDispatch( noticesStore );

  useEffect( () => {
    apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
      setLoadState(true);

      if(settings?.badeggcup?.company) {
        setCompany( settings.badeggcup.company );
      }

      if(settings?.badeggcup?.supports) {
        setSupports( settings.badeggcup.supports );
      }

      console.log(company);

    } );
  }, [] );

  const SaveButton = () => {
    return (
      <Button
        variant="primary"
        onClick={ saveSettings }
        __next40pxDefaultSize
      >
        { __( 'Save', 'badeggcup' ) }
      </Button>
    );
  };

  const saveSettings = () => {
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
        <SaveButton />
      </Flex>

      <Spacer />
      <Notices />
      <Spacer />

      <Panel className="badeggcup-panel">
        <PanelBody title={ __('Theme Support', 'badeggcup') } className="badeggcup-theme-supports">
          <Flex align="flex-start" justify="flex-start" gap="8">
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
          </Flex>
        </PanelBody>


        { (supports.colours) ? (
          <SectionColours colours={ colours } setColours={ setColours } />
        ) : null }

        { (supports.company) ? (
          <PanelBody title={ __('Company Info', 'badeggcup') } className="badeggcup-company-info">
            <Flex align="stretch" justify="flex-start" wrap={ true } gap="4">
              <Card className="badeggcup-company-info-details">
                <CardBody>
                  <h3>{ __('Details', 'badeggcup') }</h3>
                  <TextControl
                    label="Company Name"
                    value={ company.name }
                    onChange={ value => setCompany( prev => ({
                      ...prev,
                      name: value,
                    }))}
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom={ true }
                  />
                  <TextControl
                    label="Legal Name"
                    value={ company.nameLegal }
                    onChange={ value => setCompany( prev => ({
                      ...prev,
                      nameLegal: value,
                    }))}
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom={ true }
                  />
                  <TextControl
                    label="Company Number"
                    value={ company.number }
                    onChange={ value => setCompany( prev => ({
                      ...prev,
                      number: value,
                    }))}
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom={ true }
                  />
                </CardBody>
              </Card>
              <Card className="badeggcup-company-info-contact">
                <CardBody>
                  <h3>{ __('Contact', 'badeggcup') }</h3>
                  <TextControl
                    label="Telephone Number"
                    value={ company.tel }
                    onChange={ value => setCompany( prev => ({
                      ...prev,
                      tel: value,
                    }))}
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom={ true }
                  />
                  <TextControl
                    label="Email Address"
                    value={ company.email }
                    onChange={ value => setCompany( prev => ({
                      ...prev,
                      email: value,
                    }))}
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom={ true }
                  />
                </CardBody>
              </Card>
            </Flex>
            <Spacer margin="4" />
            <Flex align="stretch" justify="flex-start" wrap={ true } gap="4">
              {
                [
                  { label: __('Address', 'badeggcup'), slug: 'address'},
                  { label: __('Mailing Address', 'badeggcup'), slug: 'addressMailing'}
                ].map( (fieldGroup, index) => {
                  let label = fieldGroup.label;
                  let slug = fieldGroup.slug;
                  let addressSupport = 'company' + [...slug][0].toUpperCase() + [...slug].slice(1).join('');

                  if(supports[addressSupport]) {
                    return (
                      <Card key={ index } className="badeggcup-company-info-address-group">
                        <CardBody>
                          <h3>{ label }</h3>
                          <Flex gap="8" wrap="true" align="stretch">
                            <FlexItem>
                              {
                                [ ...Array(4).keys()].map( index => {
                                  if(index == 0 || company[slug]['line' + (index + 1)] || (index > 0 && company[slug]['line' + index])) {
                                    return (
                                      <TextControl
                                        key={ index }
                                        label={ `Line ${ index + 1 }` }
                                        value={ company[slug]['line' + (index + 1)] }
                                        onChange={ value => setCompany( prev => ({
                                          ...prev,
                                          [slug]: {
                                            ...prev[slug],
                                            ['line' + (index + 1)]: value,
                                          }
                                        }))}
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom={ true }
                                      />
                                    )
                                  }
                                })
                              }
                            </FlexItem>
                            <Divider orientation="vertical" />
                            <FlexItem>
                              {
                                [ 'city', 'county', 'postCode', 'country' ].map( (field, index) => {
                                  return (
                                    <TextControl
                                      key={ index }
                                      label={ field }
                                      value={ company[slug][field] }
                                      onChange={ value => setCompany( prev => ({
                                        ...prev,
                                        [slug]: {
                                          ...prev[slug],
                                          [field]: value,
                                        }
                                      }))}
                                      __next40pxDefaultSize
                                      __nextHasNoMarginBottom={ true }
                                    />
                                  )
                                })
                              }
                            </FlexItem>
                          </Flex>
                        </CardBody>
                      </Card>
                    )
                  }
                })
              }
            </Flex>
          </PanelBody>
        ) : null }

        { supports.companySocials ? (
          <SectionSocials company={ company } setCompany={ setCompany } />
        ) : null }

        <SectionIntegrations supports={ supports } integrations={ integrations } setIntegrations={ setIntegrations } />

      </Panel>
      <Spacer />
      <Flex justify="flex-end" >
        <SaveButton />
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
