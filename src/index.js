import './index.scss';

import domReady from '@wordpress/dom-ready';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

import {
  createRoot,
  useState,
  useEffect,
} from '@wordpress/element';

import {
  Panel,
  PanelBody,
  PanelRow,
  Flex,
  FlexItem,
  Card,
  CardBody,
  ColorPalette,
  TextControl,
  CheckboxControl,
  Spinner,
  Button,
  __experimentalDivider as Divider,
  __experimentalHeading as Heading,
  NoticeList,
} from '@wordpress/components';

const latinate = {
  1: 'primary',
  2: 'secondary',
  3: 'tertiary',
  4: 'quaternary',
  5: 'quinary',
  6: 'senary',
  7: 'septenary',
  8: 'octonary',
  9: 'nonary',
  10: 'denary',
  11: 'undenary',
  12: 'duodenary',
};

const addressDefaults = {
  line1: '',
  line2: '',
  line3: '',
  line4: '',
  city: '',
  county: '',
  postCode: '',
  country: '',
}

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

  const [ colours, setColours ] = useState({
    primary: '#395786',
    secondary: '#a094b1',
    tertiary: '',
    quaternary: '',
    quinary: '',
    senary: '',
    septenary: '',
    octonary: '',
    nonary: '',
    denary: '',
    undenary: '',
    duodenary: '',
  });

  const [ company, setCompany ] = useState({
    name: '',
    nameLegal: '',
    number: '',
    tel: '',
    email: '',
    address: addressDefaults,
    addressMailing: addressDefaults,
  });

  const [ supports, setSupports ] = useState({
    defaultPost: false,
    postRewrite: false,
    postCategory: false,
    postTag: false,
    comments: false,
    mailingAddress: false,
  });

  const { createSuccessNotice } = useDispatch( noticesStore );

  useEffect( () => {
    apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
      setLoadState(true);

      if(settings?.badeggcup?.colours) {
        setColours( settings.badeggcup.colours );
      }

      if(settings?.badeggcup?.company) {
        setCompany( settings.badeggcup.company );
      }

      if(settings?.badeggcup?.supports) {
        setSupports( settings.badeggcup.supports );
      }

    } );
  }, [] );

  const saveSettings = () => {
    apiFetch( {
      path: '/wp/v2/settings',
      method: 'POST',
      data: {
        badeggcup: {
          colours,
          company,
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
      <Notices />

      <Heading level={ 1 }>
        { __( 'Website Options', 'badeggcup' ) }
      </Heading>

      <Panel>
        { (!loadState) ? <Spinner /> : (
          <>

            <PanelBody title={ __('Brand Colours', 'badeggcup') } className="badeggcup-brand-colours">
              <PanelRow>
                {
                  Object.keys(colours).map((colour, index) => {
                    const hex = colours[colour];

                    if(index == 0 || colours[latinate[index + 1]] || (index > 0 && colours[latinate[index]])) {
                      return (
                        <div className="badeggcup-brand-colours-item" key={ index }>
                          <h3>{ colour }</h3>
                          <ColorPalette
                            value={ hex }
                            clearable={ (index > 0) ? true : false }
                            onChange={ value => {
                              setColours( prev => ({
                                ...prev,
                                [colour]: value,
                              }));
                            }}
                            headingLevel={ 3 }
                          />

                        </div>
                      )
                    }
                  })
                }
              </PanelRow>
            </PanelBody>

            <PanelBody title={ __('Company Info', 'badeggcup') } className="badeggcup-company-info">
              <PanelRow>
                <Card className="badeggcup-company-info-details">
                  <CardBody>
                    <h3>Details</h3>
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
                    <h3>Contact</h3>
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
              </PanelRow>
              <PanelRow>
                {
                  ['address', 'addressMailing'].map( (fieldGroup, index) => {
                    if(fieldGroup == 'address' || (supports.mailingAddress && fieldGroup == 'addressMailing')) {
                      return (
                        <Card key={ index } className="badeggcup-company-info-address-group">
                          <CardBody>
                            <h3>{ fieldGroup }</h3>
                            <Flex gap="8" wrap="true" align="stretch">
                              <FlexItem>
                                {
                                  [ ...Array(4).keys()].map( index => {
                                    if(index == 0 || company[fieldGroup]['line' + (index + 1)] || (index > 0 && company[fieldGroup]['line' + index])) {
                                      return (
                                        <TextControl
                                          key={ index }
                                          label={ `Line ${ index + 1 }` }
                                          value={ company[fieldGroup]['line' + (index + 1)] }
                                          onChange={ value => setCompany( prev => ({
                                            ...prev,
                                            [fieldGroup]: {
                                              ...prev[fieldGroup],
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
                                        value={ company[fieldGroup][field] }
                                        onChange={ value => setCompany( prev => ({
                                          ...prev,
                                          [fieldGroup]: {
                                            ...prev[fieldGroup],
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
              </PanelRow>
            </PanelBody>

            <PanelBody title={ __('Theme Support', 'badeggcup') } className="badeggcup-theme-supports">

              <CheckboxControl
                label={ __( 'Default Post Type', 'badeggcup' ) }
                checked={ supports.defaultPost }
                onChange={ ( value => {
                  setSupports({ ...supports, defaultPost: value });

                  if(!value) {
                    setSupports({
                      ...supports,
                      defaultPost: false,
                      postRewrite: false,
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
                      label={ __( 'Post Rewrites', 'badeggcup' ) }
                      checked={ supports.postRewrite }
                      onChange={ ( value => setSupports({ ...supports, postRewrite: value }) ) }
                      __nextHasNoMarginBottom
                    />
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
              <CheckboxControl
                label={ __( 'Mailing Address', 'badeggcup' ) }
                checked={ supports.mailingAddress }
                onChange={ ( value => setSupports({ ...supports, mailingAddress: value }) ) }
                __nextHasNoMarginBottom
              />
            </PanelBody>
          </>
        )}
      </Panel>

      <Button variant="primary" onClick={ saveSettings } __next40pxDefaultSize>
        { __( 'Save', 'badeggcup' ) }
      </Button>
    </>
  );
};

domReady( () => {
    const root = createRoot(
        document.getElementById( 'badeggcup-options' )
    );

    root.render( <OptionsPage /> );
} );
