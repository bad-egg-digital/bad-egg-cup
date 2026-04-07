import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import {
  useState,
  useEffect,
} from '@wordpress/element';

import {
  PanelBody,
  Flex,
  FlexItem,
  Card,
  CardHeader,
  CardBody,
  TextControl,
  Spinner,
  __experimentalSpacer as Spacer,
  __experimentalDivider as Divider,
  __experimentalHeading as Heading,
} from '@wordpress/components';

export default function SectionCompany({ supports, company, setCompany })
{
  const [ loadedCompany, setLoadedCompany ] = useState(false);

  useEffect( () => {
    apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
      setLoadedCompany(true);

      if(settings?.badeggcup?.company) {
        setCompany( settings.badeggcup.company );
      }
    } );
  }, [] );

  if(supports.company) {
    return (
      <PanelBody title={ __('Company Info', 'badeggcup') } className="badeggcup-company-info">
        { !loadedCompany ? <Spinner /> : (
          <>
            <Flex align="stretch" justify="flex-start" wrap={ true } gap="4">
              <Card className="badeggcup-company-info-details">
                <CardHeader>
                  <h3>{ __('Details', 'badeggcup') }</h3>
                </CardHeader>
                <CardBody>
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
                <CardHeader>
                  <h3>{ __('Contact', 'badeggcup') }</h3>
                </CardHeader>
                <CardBody>
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
                        <CardHeader>
                          <h3>{ label }</h3>
                        </CardHeader>
                        <CardBody>
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
          </>
        ) }
      </PanelBody>
    );
  }
}
