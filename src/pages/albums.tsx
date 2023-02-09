import Card from '@/components/common/Card';
import Tooltip from '@/components/common/Tooltip';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Albums = () => {
  return (
    <Main meta={<Meta title="Album" description="Album" />}>
      <p>Phồtố</p>
      <Card>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
        recusandae quidem. Quaerat molestiae blanditiis doloremque possimus
        labore voluptatibus distinctio recusandae autem esse explicabo molestias
        officia placeat, accusamus aut saepe.
      </Card>
      <div>
        <Tooltip description="hihi">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
          recusandae quidem. Quaerat molestiae blanditiis doloremque possimus
          labore voluptatibus distinctio recusandae autem esse explicabo
          molestias officia placeat, accusamus aut saepe.
        </Tooltip>
      </div>
    </Main>
  );
};

export default Albums;
