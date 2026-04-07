import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import {
  useState,
  useEffect,
} from '@wordpress/element';

import {
  PanelBody,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardDivider,
  CardFooter,
  TextControl,
  Spinner,
} from '@wordpress/components';

export default function SectionIntegrations({ supports, integrations, setIntegrations })
{
  const [ loadedIntegrations, setLoadedIntegrations ] = useState(false);

  useEffect( () => {
    apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
      setLoadedIntegrations(true);

      if(settings?.badeggcup?.integrations) {
        setIntegrations( settings.badeggcup.integrations );
      }
    } );
  }, [] );


  if(supports.integrations) {
    return (
      <PanelBody title={ __('Third-party Integrations', 'badeggcup') } className="badeggcup-integrations">
        { !loadedIntegrations ? <Spinner /> : (
          <Flex align="stretch" justify="flex-start" gap="4">
            { supports.integrationsPlausible ? (
              <Card className="badeggcup-integrations-plausible">
                <CardBody>
                  <h3>{ __('Plausible Analytics', 'badeggcup') }</h3>
                  <TextControl
                    label={ __('Tracking ID', 'badeggcup') }
                    value={ integrations.plausibleID }
                    onChange={ value => setIntegrations( prev => ({
                      ...prev,
                      plausibleID: value,
                    }))}
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom={ true }
                  />
                  <TextControl
                    label={ __('Host', 'badeggcup') }
                    value={ integrations.plausibleHost }
                    onChange={ value => setIntegrations( prev => ({
                      ...prev,
                      plausibleHost: value,
                    }))}
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom={ true }
                  />
                </CardBody>
              </Card>
            ) : null }

            { supports.integrationsFathom ? (
              <Card className="badeggcup-integrations-fathom">
                <CardBody>
                  <h3>{ __('Fathom Analytics', 'badeggcup') }</h3>
                  <TextControl
                    label={ __('Tracking ID', 'badeggcup') }
                    value={ integrations.fathomID }
                    onChange={ value => setIntegrations( prev => ({
                      ...prev,
                      fathomID: value,
                    }))}
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom={ true }
                  />
                </CardBody>
              </Card>
            ) : null }
          </Flex>
        )}
      </PanelBody>
    );
  }
}
