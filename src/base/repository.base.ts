import { NotFoundException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { EntityRepository, FindManyOptions, Repository } from 'typeorm';

@EntityRepository()
export class BaseRepository<T> extends Repository<T> {
  /**
   * hàm này để tạo 1 row trong db
   * @param item : là kiểu nhận vào
   * @returns item : là kiểu trả về
   */
  createItem(item: T) {
    const newItem = this.create(item);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    newItem.id = nanoid(10);
    const itemCreate = this.save(newItem);
    if (itemCreate) {
      return itemCreate;
    } else {
      throw new Notification('Create Fail');
    }
  }

  async findAllItem(filter?: FindManyOptions<T>): Promise<T[]> {
    const item = await this.find(filter);
    if (item) {
      return item;
    } else {
      throw new NotFoundException(`not found`);
    }
  }

  async findById(id: string) {
    const item = await this.findOne(id);
    if (item) {
      return item;
    } else {
      //! không tìm thấy id
      throw new NotFoundException(`${id} not found`);
    }
  }

  async updateItem(id: string, itemToUpdate: any) {
    const item = await this.update(id, itemToUpdate);
    if (item) {
      return item;
    } else {
      throw new Notification('Update Fail');
    }
  }

  async deleteItem(id: string) {
    const item = await this.softDelete(id);
    if (item) {
      return item;
    } else {
      throw new NotFoundException(`${id} not found`);
    }
  }

  async restoreItem(id: string) {
    const item = await this.restore(id);
    if (item) {
      return item;
    } else {
      throw new NotFoundException(`${id} not found`);
    }
  }

  // async insertManyItems(items: T[]) {
  //   const result: T[] = [];
  //   for (const item of items) {
  //     const newItem = await this.createItem(item);
  //     result.push(newItem);
  //   }
  //   return result;
  // }
}
