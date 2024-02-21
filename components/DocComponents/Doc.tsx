"use client"
import { me as me_} from '@/types/collection';
import { Button, Card, CardBody } from '@nextui-org/react';
import React from 'react'

type Props = {}

function Doc({}: Props) {
  const [me, setMe] = React.useState<any>(me_);
  return (
    <Card>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Button color="primary" onPress={() => setMe(me_)}>Update</Button>
    </Card>
  )
}

export default Doc