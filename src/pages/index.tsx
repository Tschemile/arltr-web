import { useRouter } from 'next/router';
import { useState } from 'react';

import Tabs from '@/components/common/Tabs';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const options = [
  {
    key: '1',
    title: 'Tab 1',
    content: 'Test tab 1',
  },
  {
    key: '2',
    title: 'Tab 2',
    content: 'Test tab 2',
  },
  {
    key: '3',
    title: 'Tab 3',
    content: 'Test tab 3',
  },
  {
    key: '4',
    title: 'Tab 4',
    content: (
      <>
        <p>Test</p>
        <img
          src="https://genk.mediacdn.vn/2018/8/22/maxresdefault-3-1534914028092859095407.jpg"
          alt=""
        />
      </>
    ),
  },
];

const Index = () => {
  const router = useRouter();
  const [active, setIsActive] = useState('1');

  return (
    <Main meta={<Meta title="I ♥ U" description="I ♥ U" />}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta commodi
      enim obcaecati rerum. Voluptate temporibus cumque quisquam necessitatibus
      neque sed dolorum fuga explicabo. Nihil odit atque, expedita quo voluptas
      temporibus! Temporibus quod velit accusamus explicabo saepe itaque
      voluptate tempore ea id at? Veritatis quis repellat harum molestias cumque
      voluptas soluta maxime et reprehenderit, amet culpa, repellendus, quisquam
      accusamus tempora fugit! Sunt, laudantium eos, ratione corporis tempore
      similique eveniet ab temporibus maiores voluptatum quas quasi nesciunt
      magnam recusandae error nemo modi doloribus sit sed eligendi distinctio,
      voluptate obcaecati. Voluptatibus, dolorum saepe. Voluptatum dignissimos
      veniam aut repellat corporis asperiores eaque, distinctio voluptatem
      voluptate quasi quia deleniti ratione deserunt quibusdam sapiente, eos
      totam, sed hic provident sequi consequuntur? Officiis ullam quis
      temporibus blanditiis? Exercitationem laudantium debitis repellat
      voluptatibus quas tempora dolor mollitia, totam eligendi qui excepturi ex
      incidunt sapiente tenetur suscipit in nihil hic cumque iure voluptatem
      magni quisquam ipsum similique autem. Ab. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Dicta commodi enim obcaecati rerum.
      Voluptate temporibus cumque quisquam necessitatibus neque sed dolorum fuga
      explicabo. Nihil odit atque, expedita quo voluptas temporibus! Temporibus
      quod velit accusamus explicabo saepe itaque voluptate tempore ea id at?
      Veritatis quis repellat harum molestias cumque voluptas soluta maxime et
      reprehenderit, amet culpa, repellendus, quisquam accusamus tempora fugit!
      Sunt, laudantium eos, ratione corporis tempore similique eveniet ab
      temporibus maiores voluptatum quas quasi nesciunt magnam recusandae error
      nemo modi doloribus sit sed eligendi distinctio, voluptate obcaecati.
      Voluptatibus, dolorum saepe. Voluptatum dignissimos veniam aut repellat
      corporis asperiores eaque, distinctio voluptatem voluptate quasi quia
      deleniti ratione deserunt quibusdam sapiente, eos totam, sed hic provident
      sequi consequuntur? Officiis ullam quis temporibus blanditiis?
      Exercitationem laudantium debitis repellat voluptatibus quas tempora dolor
      mollitia, totam eligendi qui excepturi ex incidunt sapiente tenetur
      suscipit in nihil hic cumque iure voluptatem magni quisquam ipsum
      similique autem. Ab. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Dicta commodi enim obcaecati rerum. Voluptate temporibus cumque
      quisquam necessitatibus neque sed dolorum fuga explicabo. Nihil odit
      atque, expedita quo voluptas temporibus! Temporibus quod velit accusamus
      explicabo saepe itaque voluptate tempore ea id at? Veritatis quis repellat
      harum molestias cumque voluptas soluta maxime et reprehenderit, amet
      culpa, repellendus, quisquam accusamus tempora fugit! Sunt, laudantium
      eos, ratione corporis tempore similique eveniet ab temporibus maiores
      voluptatum quas quasi nesciunt magnam recusandae error nemo modi doloribus
      sit sed eligendi distinctio, voluptate obcaecati. Voluptatibus, dolorum
      saepe. Voluptatum dignissimos veniam aut repellat corporis asperiores
      eaque, distinctio voluptatem voluptate quasi quia deleniti ratione
      deserunt quibusdam sapiente, eos totam, sed hic provident sequi
      consequuntur? Officiis ullam quis temporibus blanditiis? Exercitationem
      laudantium debitis repellat voluptatibus quas tempora dolor mollitia,
      totam eligendi qui excepturi ex incidunt sapiente tenetur suscipit in
      nihil hic cumque iure voluptatem magni quisquam ipsum similique autem. Ab.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta commodi
      enim obcaecati rerum. Voluptate temporibus cumque quisquam necessitatibus
      neque sed dolorum fuga explicabo. Nihil odit atque, expedita quo voluptas
      temporibus! Temporibus quod velit accusamus explicabo saepe itaque
      voluptate tempore ea id at? Veritatis quis repellat harum molestias cumque
      voluptas soluta maxime et reprehenderit, amet culpa, repellendus, quisquam
      accusamus tempora fugit! Sunt, laudantium eos, ratione corporis tempore
      similique eveniet ab temporibus maiores voluptatum quas quasi nesciunt
      magnam recusandae error nemo modi doloribus sit sed eligendi distinctio,
      voluptate obcaecati. Voluptatibus, dolorum saepe. Voluptatum dignissimos
      veniam aut repellat corporis asperiores eaque, distinctio voluptatem
      voluptate quasi quia deleniti ratione deserunt quibusdam sapiente, eos
      totam, sed hic provident sequi consequuntur? Officiis ullam quis
      temporibus blanditiis? Exercitationem laudantium debitis repellat
      voluptatibus quas tempora dolor mollitia, totam eligendi qui excepturi ex
      incidunt sapiente tenetur suscipit in nihil hic cumque iure voluptatem
      magni quisquam ipsum similique autem. Ab. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Dicta commodi enim obcaecati rerum.
      Voluptate temporibus cumque quisquam necessitatibus neque sed dolorum fuga
      explicabo. Nihil odit atque, expedita quo voluptas temporibus! Temporibus
      quod velit accusamus explicabo saepe itaque voluptate tempore ea id at?
      Veritatis quis repellat harum molestias cumque voluptas soluta maxime et
      reprehenderit, amet culpa, repellendus, quisquam accusamus tempora fugit!
      Sunt, laudantium eos, ratione corporis tempore similique eveniet ab
      temporibus maiores voluptatum quas quasi nesciunt magnam recusandae error
      nemo modi doloribus sit sed eligendi distinctio, voluptate obcaecati.
      Voluptatibus, dolorum saepe. Voluptatum dignissimos veniam aut repellat
      corporis asperiores eaque, distinctio voluptatem voluptate quasi quia
      deleniti ratione deserunt quibusdam sapiente, eos totam, sed hic provident
      sequi consequuntur? Officiis ullam quis temporibus blanditiis?
      Exercitationem laudantium debitis repellat voluptatibus quas tempora dolor
      mollitia, totam eligendi qui excepturi ex incidunt sapiente tenetur
      suscipit in nihil hic cumque iure voluptatem magni quisquam ipsum
      similique autem. Ab. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Dicta commodi enim obcaecati rerum. Voluptate temporibus cumque
      quisquam necessitatibus neque sed dolorum fuga explicabo. Nihil odit
      atque, expedita quo voluptas temporibus! Temporibus quod velit accusamus
      explicabo saepe itaque voluptate tempore ea id at? Veritatis quis repellat
      harum molestias cumque voluptas soluta maxime et reprehenderit, amet
      <Tabs
        options={options}
        defaultKey={active}
        handleChange={(key) => setIsActive(key)}
      />
    </Main>
  );
};

export default Index;
