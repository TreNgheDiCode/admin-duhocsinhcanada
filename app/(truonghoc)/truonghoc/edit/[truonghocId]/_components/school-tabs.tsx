"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { School, Student, User } from "@prisma/client";
import React from "react";
import { UsersDataTable } from "./_data/users-data-table";
import { usersColumns } from "./_data/users-column";
import { SchoolFull, StudentProfile } from "@/types";
import { OperationsDataTable } from "./_data/operations-data-table";
import { operationsColumns } from "./_data/operations-columns";
import { ProgramsDataTable } from "./_data/programs-data-table";
import { programsColumns } from "./_data/programs-column";
import { useSchoolModal } from "@/hooks/use-school-modal";
import { Button } from "@/components/ui/button";
import DisplayRequirement from "./requirements/display-requirement-school";
import DisplayHistory from "./history/display-history-school";
import { BlogsDataTable } from "./_data/blogs-data-table";
import { blogsColumns } from "./_data/blogs-column";

type Props = {
  school: SchoolFull;
  filterUsers: User[];
  students: (Student & {
    user: User;
  })[];
  schools: School[];
};

const SchoolTabs = ({ school, filterUsers, schools, students }: Props) => {
  const { onOpen } = useSchoolModal();

  return (
    <Tabs defaultValue="users">
      <TabsList className="grid w-full h-full md:grid-cols-3 lg:grid-cols-6 gap-y-3">
        <TabsTrigger value="users">Học sinh</TabsTrigger>
        <TabsTrigger value="operations">Cơ sở</TabsTrigger>
        <TabsTrigger value="history">Lịch sử</TabsTrigger>
        <TabsTrigger value="blogs">Blogs</TabsTrigger>
        <TabsTrigger value="programs">Ngành học</TabsTrigger>
        <TabsTrigger value="requirements">Yêu cầu</TabsTrigger>
      </TabsList>
      <TabsContent value="users">
        <UsersDataTable
          columns={usersColumns}
          data={school.students}
          school={school}
          users={filterUsers}
          schools={schools}
        />
      </TabsContent>
      <TabsContent value="operations">
        <OperationsDataTable
          columns={operationsColumns}
          data={school.operations}
          school={school}
        />
      </TabsContent>
      <TabsContent value="history">
        {school.history.length <= 0 ? (
          <div className="container">
            <div className="flex items-center justify-center">
              <Button onClick={() => onOpen("createHistory", { school })}>
                Thêm lịch sử
              </Button>
            </div>
          </div>
        ) : (
          <DisplayHistory
            schoolName={school.name}
            history={school.history[0]}
          />
        )}
      </TabsContent>
      <TabsContent value="blogs">
        <BlogsDataTable
          columns={blogsColumns}
          data={school.blogs}
          school={school}
          schools={schools}
          students={students}
        />
      </TabsContent>
      <TabsContent value="programs">
        <ProgramsDataTable
          columns={programsColumns}
          data={school.programs}
          school={school}
        />
      </TabsContent>
      <TabsContent value="requirements">
        {school.requirement.length <= 0 ? (
          <div className="container">
            <div className="flex items-center justify-center">
              <Button onClick={() => onOpen("createRequirement", { school })}>
                Thêm yêu cầu
              </Button>
            </div>
          </div>
        ) : (
          <DisplayRequirement
            schoolName={school.name}
            requirement={school.requirement[0]}
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default SchoolTabs;
